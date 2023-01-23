from sys import argv
import asyncio
import websockets
import json

connected = set()

async def socket_handler(websocket):
    # Register connection
    connected.add(websocket)

    try:
        async for message in websocket:
            # Determine action based on message
            if message == "update":
                websockets.broadcast(connected, "Receiving update...")
            else:
                websockets.broadcast(connected, message)

    finally:
        # Unregister connection
        connected.remove(websocket)

async def main(port=8889):
    print(f'Starting websocket server on port {port}...')
    async with websockets.serve(socket_handler, "localhost", port):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    if len(argv) == 2:
        asyncio.run(main(port=int(argv[1])))
    else:
        asyncio.run(main())
