from sys import argv
from urllib.request import urlopen
import asyncio
import json
import socket
import websockets

MSN_DATA_FILE = 'msn-data.json'
DATA_SERVERS = [
    "http://localhost:8012",
    "http://localhost:8013",
    "http://localhost:8014",
    "http://localhost:8015",
    "http://localhost:8016",
    "http://localhost:8017"
]

# Connection channels
connections = {
    '/msn-controller': set(),
    '/msn-dashboard': set()
}

def build_msn_data(path='/'):
    with open(MSN_DATA_FILE, 'w') as msn_data_file:
        data = {}
        for idx, data_server in enumerate(DATA_SERVERS):
            content = urlopen(f"{data_server}{path}").read().decode()
            json_data = json.loads(content)

            key = list(json_data.keys())[0] # Grab the first key (shop name)

            # Pull target from intel
            if key == 'intel':
                data['target'] = json_data[key]['target']

            json_data[key].pop('target') # Remove target before writing to data
            data[key] = json_data[key]

        msn_data_file.write(json.dumps(data))
        msn_data_file.close()
    websockets.broadcast(connections['/msn-controller'], "Built mission data on MSN API Server")

def restore_msn_data():
    for idx, data_server in enumerate(DATA_SERVERS):
        urlopen(f"{data_server}/restore")
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
                    msn_data_file.write(f"[]")
                    msn_data_file.close()
                websockets.broadcast(connections['/msn-controller'], "Reset mission data on MSN API Server")

    finally:
        # Unregister connection
        connections[path].remove(websocket)

async def main(local_ip='localhost', port=8888):
    print(f'Starting websocket server at {local_ip}:{port}...')
    async with websockets.serve(socket_handler, local_ip, port):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    if len(argv) == 3:
        asyncio.run(main(local_ip=argv[1], port=int(argv[2])))
    else:
        asyncio.run(main())
