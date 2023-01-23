from sys import argv
from urllib.request import urlopen
import asyncio
import websockets
import json

MSN_DATA_FILE = 'msn-data.json'
DATA_SERVERS = [
    "http://localhost:8008",
    "http://localhost:8009",
    "http://localhost:8010",
    "http://localhost:8011"
]

connected = set()

async def socket_handler(websocket):
    # Register connection
    connected.add(websocket)

    try:
        async for message in websocket:
            print(f"Received message: {message}")
            # Determine action based on message
            if message == "get":
                with open(MSN_DATA_FILE) as file:
                    data = json.load(file)
                    websockets.broadcast(connected, str(data))
                    file.close()
            elif message == "fetch":
                with open(MSN_DATA_FILE, 'w') as msn_data_file:
                    msn_data_file.write(f"[\n")
                    for idx, data_server in enumerate(DATA_SERVERS):
                        content = urlopen(data_server).read().decode()
                        if (idx + 1) == len(DATA_SERVERS):
                            msn_data_file.write(f"{content}\n")
                        else:
                            msn_data_file.write(f"{content},\n")
                    msn_data_file.write(f"]\n")
                    msn_data_file.close()
                websockets.broadcast(connected, "{'fetched': true}")
            elif message == "reset":
                with open(MSN_DATA_FILE, 'w') as msn_data_file:
                    msn_data_file.write(f"[]")
                    msn_data_file.close()
                websockets.broadcast(connected, "{'reset': true}")
            #else:
            #    websockets.broadcast(connected, f"Command '{message}' not recognized...")

    finally:
        # Unregister connection
        connected.remove(websocket)

async def main(port=8888):
    print(f'Starting websocket server on port {port}...')
    async with websockets.serve(socket_handler, "localhost", port):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    if len(argv) == 2:
        asyncio.run(main(port=int(argv[1])))
    else:
        asyncio.run(main())
