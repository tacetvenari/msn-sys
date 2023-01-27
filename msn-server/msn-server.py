from sys import argv
from urllib.request import urlopen
import asyncio
import json
import socket
import websockets

MSN_DATA_FILE = 'msn-data.json'
DATA_SERVERS = [
    "http://localhost:8008",
    "http://localhost:8009",
    "http://localhost:8010",
    "http://localhost:8011"
]

# Connection channels
connections = {
    '/controller': set(),
    '/dashboard': set()
}

def build_msn_data(path='/'):
    with open(MSN_DATA_FILE, 'w') as msn_data_file:
        msn_data_file.write(f"[\n")
        for idx, data_server in enumerate(DATA_SERVERS):
            content = urlopen(f"{data_server}{path}").read().decode()
            if (idx + 1) == len(DATA_SERVERS):
                msn_data_file.write(f"{content}\n")
            else:
                msn_data_file.write(f"{content},\n")
        msn_data_file.write(f"]\n")
        msn_data_file.close()
    websockets.broadcast(connections['/controller'], "{'build': true}")


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
                    websockets.broadcast(connections['/dashboard'], json.dumps(data))
                    websockets.broadcast(connections['/controller'], "{'publish': true}")
                    file.close()
            elif message == "build":
                build_msn_data()
            elif message == "return":
                build_msn_data('/return')
            elif message == "reset":
                with open(MSN_DATA_FILE, 'w') as msn_data_file:
                    msn_data_file.write(f"[]")
                    msn_data_file.close()
                websockets.broadcast(connections['/controller'], "{'reset': true}")

    finally:
        # Unregister connection
        connections[path].remove(websocket)

async def main(port=8888):
    local_ip = socket.gethostbyname(socket.getfqdn())
    print(f'Starting websocket server at {local_ip}:{port}...')
    async with websockets.serve(socket_handler, "192.168.0.88", port):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    if len(argv) == 2:
        asyncio.run(main(port=int(argv[1])))
    else:
        asyncio.run(main())
