from sys import argv
from urllib import request, parse
import asyncio
import json
import socket
import os
import websockets

MSN_DATA_FILE = 'msn-data.json'
# DATA_SERVERS = [
#         {"name": "bcd",   "url": "http://localhost:8012"},
#         {"name": "gccs",  "url": "http://localhost:8013"},
#         {"name": "iamd",  "url": "http://localhost:8014"},
#         {"name": "intel", "url": "http://localhost:8015"},
#         {"name": "freq",  "url": "http://localhost:8016"},
#         {"name": "wx",    "url": "http://localhost:8017"},
# ]

DATA_SERVERS = [
        {"name": "bcd",   "url": "http://msn-data-1:8012"},
        {"name": "gccs",  "url": "http://msn-data-2:8012"},
        {"name": "iamd",  "url": "http://msn-data-3:8012"},
        {"name": "intel", "url": "http://msn-data-4:8012"},
        {"name": "freq",  "url": "http://msn-data-5:8012"},
        {"name": "wx",    "url": "http://msn-data-6:8012"},
]

# Connection channels
connections = {
    '/msn-controller': set(),
    '/msn-dashboard': set(),
    '/check-in': set()
}

def build_msn_data(path='/'):
    with open(MSN_DATA_FILE, 'w') as msn_data_file:
        data = {}
        for idx, data_server in enumerate(DATA_SERVERS):
            try:
                content = request.urlopen(f"{data_server['url']}{path}").read().decode()
                json_data = json.loads(content)

                key = list(json_data.keys())[0] # Grab the first key (shop name)
                data[key] = json_data[key]
            except:
                websockets.broadcast(connections['/msn-controller'], f"Can't reach {data_server['name'].upper()} @ {data_server['url']}")

        msn_data_file.write(json.dumps(data))
        msn_data_file.close()
    websockets.broadcast(connections['/msn-controller'], "Built mission data on MSN API Server")

def restore_msn_data():
    for idx, data_server in enumerate(DATA_SERVERS):
        request.urlopen(f"{data_server['url']}/restore")

    websockets.broadcast(connections['/msn-controller'], "Restored MSN Data on MSN Data Servers")

async def socket_handler(websocket, path):
    # Register connection
    connections[path].add(websocket)

    try:
        async for message in websocket:
            print(f"Received message: {message}")
            # Determine action based on message
            if message == "publish":
                with open(MSN_DATA_FILE) as file:
                    data = json.load(file)
                    websockets.broadcast(connections['/msn-dashboard'], json.dumps(data))
                    websockets.broadcast(connections['/msn-controller'], "Published mission data to MSN Dashboard")
                    file.close()
            elif message == "build":
                build_msn_data()
            elif message == "return":
                build_msn_data('/return')
            elif message == "restore":
                restore_msn_data()
            elif message == "reset":
                with open(MSN_DATA_FILE, 'w') as msn_data_file:
                    msn_data_file.write("{}")
                    msn_data_file.close()
                websockets.broadcast(connections['/msn-controller'], "Reset mission data on MSN API Server")
            elif message.startswith("updateIntel"):
                data = { 'msn_data': message.split(' ')[1] }

                for server in DATA_SERVERS:
                    if server['name'] == "intel":
                        post_url = server['url'] + '/updateMsn'

                post_data = parse.urlencode(data).encode()
                req = request.Request(post_url, data=post_data)
                resp = request.urlopen(req)
                websockets.broadcast(connections['/msn-controller'], "Updated Intel mission data")
            elif message.startswith('check-in'):
                await check_in(message)

    finally:
        # Unregister connection
        connections[path].remove(websocket)

async def check_in(message):
    # Test Brodcast
    websockets.broadcast(connections['/check-in'], "Checking in")

    # Split message on spaces
    cmd=message.split(" ")

    # Check if enough arguments
    if len(cmd) != 4:
        help_msg= \
        '''Invalid number of arguments:
        check-in IP_ADDR PORT SYSTEM_NAME'''
        websockets.broadcast(connections['/check-in'], help_msg)
        return
    # Does Data server exist?
    d_server = next((item for item in DATA_SERVERS if item["name"] == cmd[3]), False)
    if d_server == False:
        websockets.broadcast(connections['/check-in'], f"FAIL: \'{cmd[3]}\' is not a valid data server")
        return
    # Is IP valid?
    ip=cmd[1].split(".")
    if not (len(ip) == 4 and \
        int(ip[0]) in range(0,255) and \
        int(ip[1]) in range(0,255) and \
        int(ip[2]) in range(0,255) and \
        int(ip[3]) in range(0,255)):
        websockets.broadcast(connections['/check-in'], f"FAIL: \'{cmd[1]}\' is not a valid ip_address")
        return
    # Is Port valid?
    if not (int(cmd[2]) in range(0,65535)):
        websockets.broadcast(connections['/check-in'], f"FAIL: \'{cmd[2]}\' is not a valid port")
        return

    # Check-in the Data server
    d_server['url']=f"http://{cmd[1]}:{cmd[2]}"
    # print(DATA_SERVERS)
    websockets.broadcast(connections['/check-in'], f"Checked in {d_server}")
    websockets.broadcast(connections['/check-in'], "CLOSE")



async def main(local_ip='localhost', port=8888):
    print(f'Starting websocket server at {local_ip}:{port}...')
    async with websockets.serve(socket_handler, local_ip, port):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    if len(argv) == 3:
        asyncio.run(main(local_ip=argv[1], port=int(argv[2])))
    else:
        asyncio.run(main())
