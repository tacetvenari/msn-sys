#!/usr/bin/env python
import json
import shutil
import socket
import logging
from http.server import BaseHTTPRequestHandler, HTTPServer
from time import sleep
from threading import Thread
from websockets.sync.client import connect
from sys import argv
from websockets.sync.client import connect
from sys import stdout

# Set logging for docker
log = logging.getLogger('log')
log.setLevel(logging.DEBUG)
consoleHandler = logging.StreamHandler(stdout) #set streamhandler to stdout
log.addHandler(consoleHandler)


CPE_SERVER="cpe"
CPE_PORT="8080"

def send_data(data, s, p):
    log.info(f"===========  ws://{s}:{p}  ====================")
    with connect(f"ws://{s}:{p}") as websocket:
        websocket.send(data)
        log.info(f"Sending: {data}")
        msg = websocket.recv()
        log.info(f"Received: {msg}")

def send_msg(data, s, p):
    msg=json.dumps({"id":"msg", "data":data})
    send_data(msg, s, p)



CHECKIN_TIMER=5
IPADDR=socket.gethostbyname(socket.gethostname())

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    # GET returns MX JSON data based on path
    def do_GET(self):
        files = {
            "/": "mx-data.json",
            "/restore": "backup-mx-data.json",
            "/return": "return-mx-data.json"
        }

        if self.path == "/favicon.ico": # Ignore favicon requests
            return False
        elif self.path == "/restore": # Restore backup data
            print("Restoring data...")
            message = { "message" : "Restore complete"}

            shutil.copy(files['/restore'], files['/']) # Overwrite data with backup

            self._set_headers()
            self.wfile.write(json.dumps(message).encode('utf-8'))
        else: # Respond with JSON
            json_text=""
            with open(files[self.path]) as file:
                data = json.load(file)
                TAILNUMBER = str(argv[2])
                data['tailnumber'] = TAILNUMBER

                self._set_headers()
                json_text=json.dumps(data).encode('utf-8')
                # Send to CPE
                log.info("Sending JSON")
                send_msg(str(json_text), CPE_SERVER, CPE_PORT)

                # Write json
                self.wfile.write(json_text)




    # POST writes data to log and returns the data written
    def do_POST(self):
        with open('log', 'a') as log:
            content = self.rfile.read(int(self.headers.get('Content-Length')))
            log.write(f'{content.decode()}\n')

            self._set_headers()
            self.wfile.write(content)

            log.close()

def run(server_class=HTTPServer, handler_class=Server, port='8008', tailnumber='tv-01'):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    log.info('Starting MX Data Server on port %d...' % port)
    httpd.serve_forever()

def check_in(test, PORT, NAME, API_IP, API_PORT):
    while True:
        sleep(CHECKIN_TIMER)
        # Connect to the API Server
        with connect(f"ws://{API_IP}:{API_PORT}/check-in") as websocket:
        # Send Command to check-in
            websocket.send(f"check-in {IPADDR} {PORT} {NAME}")
            message=""
            while True:
                if ("FAIL" in message) or ("CLOSE" == message):
                    break
                message = websocket.recv()
                # Receive/Handle Errors
                print(f"Received: {message}")
        if test == True:
            break

def server():
    try:
        run(port=PORT, tailnumber=TAILNUMBER)
    except:
        log.error('Missing args:')
        log.error('> python server.py PORT TAILNUMBER API_IP API_PORT CPE_IP CPE_PORT')
        exit()



if __name__ == '__main__':
    PORT = int(argv[1])
    TAILNUMBER = str(argv[2])
    API_IP = argv[3]
    API_PORT = argv[4]
    try:
        CPE_SERVER=argv[5]
        CPE_PORT=argv[6]
    except:
        pass

    server_thread=Thread(target=server)
    check_in_thread = Thread(target=check_in, args=[False, PORT, TAILNUMBER, API_IP, API_PORT])

    server_thread.start()
    check_in_thread.start()

    server_thread.join()
    check_in_thread.join()
