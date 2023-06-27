#!/usr/bin/env python
import json
import asyncio
from websockets.server import serve



async def receive_file(websocket, msg, client_str):
    print(f"received: {msg} - {client_str}")
    if msg["seq"] < 0:
        message_ids.append(msg["id"])
        messages.append([""]*(abs(msg["seq"])+1))
        msg["seq"] = 0
    messages[message_ids.index(msg["id"])][msg["seq"]]=msg['data']
    if not ("" in messages[message_ids.index(msg["id"])]):
        joined_msg="".join(messages[message_ids.index(msg["id"])])
        print(joined_msg)
    print("sending: ok")
    await websocket.send("ok")

async def receive(websocket):
    client_str = f'{websocket.remote_address[0]}:{websocket.remote_address[1]}'
    async for message in websocket:
        msg = json.loads(message)
        if msg["id"] == "msg":
            data=msg["data"]
            print(f"received: {data} - {client_str}")
            print("sending: ok")
            await websocket.send("ok")
        else:
            await receive_file(websocket, msg, client_str)

async def main():
    print("Starting Server")
    async with serve(receive, "127.0.0.1", 8080):
        await asyncio.Future()  # run forever

message_ids=[]
messages=[]
asyncio.run(main())
