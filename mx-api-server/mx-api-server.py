from sys import argv
from urllib.request import urlopen
import asyncio
import json
import os
import socket
import websockets

MX_DATA_FILE = 'mx-data.json'
DATA_SERVERS = [
    { "name": "tv-01", "url": "http://localhost:8008"},
    { "name": "tv-02", "url": "http://localhost:8009"},
    { "name": "tv-05", "url": "http://localhost:8010"},
    { "name": "tv-06", "url": "http://localhost:8011"},
]

# Connection channels
connections = {
    '/mx-controller': set(),
    '/mx-dashboard': set(),
    '/mx-sortie-state': set()
}

# Build MX data from data servers; Path determines source file to build from
def build_mx_data(path='/'):
    with open(MX_DATA_FILE, 'w') as msn_data_file:
        msn_data_file.write(f"[\n")
        for idx, data_server in enumerate(DATA_SERVERS):
            try:
                content = urlopen(f"{data_server['url']}{path}").read().decode()
                if (idx + 1) == len(DATA_SERVERS):
                    msn_data_file.write(f"{content}\n")
                else:
                    msn_data_file.write(f"{content},\n")
            except:
                websockets.broadcast(connections['/mx-controller'], f"Can't reach {data_server['name'].upper()} @ {data_server['url']}")

        msn_data_file.write(f"]\n")
        msn_data_file.close()
    websockets.broadcast(connections['/mx-controller'], "Built MX Data on MX API Server")

# Send GET to all data servers on the restore path
def restore_mx_data():
    for idx, data_server in enumerate(DATA_SERVERS):
        content = urlopen(f"{data_server['url']}/restore")
    websockets.broadcast(connections['/mx-controller'], "Restored MX Data on MX Data Servers")

async def socket_handler(websocket, path):
    # Register connection
    connections[path].add(websocket)

    # Handle websocket messages
    try:
        async for message in websocket:
            print(f"Received message: {message}")
            # Determine action based on message
            if message == "publish":
                with open(MX_DATA_FILE) as file:
                    data = json.load(file)
                    websockets.broadcast(connections['/mx-dashboard'], json.dumps(data))
                    websockets.broadcast(connections['/mx-controller'], "Published MX Data to MX Dashboard")
                    file.close()
            elif message == "build":
                build_mx_data()
            elif message == "return":
                build_mx_data("/return")
            elif message == "restore":
                restore_mx_data()
            elif message == "reset":
                with open(MX_DATA_FILE, 'w') as msn_data_file:
                    msn_data_file.write(f"[]")
                    msn_data_file.close()
                websockets.broadcast(connections['/mx-controller'], "Reset MX Data on MX API Server")
            elif message == "sortie-land":
                websockets.broadcast(connections['/mx-sortie-state'], "land")
                websockets.broadcast(connections['/mx-controller'], "Sortie state: LANDED")
            elif message == "sortie-takeoff":
                websockets.broadcast(connections['/mx-sortie-state'], "takeoff")
                websockets.broadcast(connections['/mx-controller'], "Sortie state: TAKEOFF")
            elif message == "sortie-canx":
                websockets.broadcast(connections['/mx-sortie-state'], "canx")
                websockets.broadcast(connections['/mx-controller'], "Sortie state: CANXD")

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
