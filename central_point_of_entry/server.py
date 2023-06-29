#!/usr/bin/env python
import json
import asyncio
import logging
from sys import stdout
from websockets.server import serve

# Set logging for docker
log = logging.getLogger('log')
log.setLevel(logging.DEBUG)
consoleHandler = logging.StreamHandler(stdout) #set streamhandler to stdout
log.addHandler(consoleHandler)

async def receive_file(websocket, msg, client_str):
    log.info(f"received: {msg} - {client_str}")
    if msg["seq"] < 0:
        message_ids.append(msg["id"])
        messages.append([""]*(abs(msg["seq"])+1))
        msg["seq"] = 0
    messages[message_ids.index(msg["id"])][msg["seq"]]=msg['data']
    if not ("" in messages[message_ids.index(msg["id"])]):
        joined_msg="".join(messages[message_ids.index(msg["id"])])
        log.info(joined_msg)
    log.info("sending: ok")
    await websocket.send("ok")

async def receive(websocket):
    client_str = f'{websocket.remote_address[0]}:{websocket.remote_address[1]}'
    async for message in websocket:
        msg = json.loads(message)
        if msg["id"] == "msg":
            data=msg["data"]
            log.info(f"received: {data} - {client_str}")
            log.info("sending: ok")
            await websocket.send("ok")
        else:
            await receive_file(websocket, msg, client_str)

async def main():
    log.info("Starting Server")
    async with serve(receive, "0.0.0.0", 8080):
        await asyncio.Future()  # run forever

message_ids=[]
messages=[]
log.info("Starting CPE Server")
asyncio.run(main())
