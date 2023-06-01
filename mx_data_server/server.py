from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import shutil
import socket
from time import sleep
from threading import Thread
import asyncio
from websockets.sync.client import connect
from sys import argv

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

            with open(files[self.path]) as file:
                data = json.load(file)
                TAILNUMBER = str(argv[2])
                data['tailnumber'] = TAILNUMBER

                self._set_headers()
                self.wfile.write(json.dumps(data).encode('utf-8'))

                file.close()

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

    print('Starting MX Data Server on port %d...' % port)
    httpd.serve_forever()

def check_in():
    while True:
        sleep(CHECKIN_TIMER)
        # Connect to the API Server
        with connect(f"ws://{API_IP}:{API_PORT}/check-in") as websocket:
        # Send Command to check-in
            websocket.send(f"check-in {IPADDR} {PORT} {TAILNUMBER}")
            message=""
            while True:
                if ("FAIL" in message) or ("CLOSE" == message):
                    break 
                message = websocket.recv()
                # Receive/Handle Errors
                print(f"Received: {message}")
        
    
def server():
    try:
        run(port=PORT, tailnumber=TAILNUMBER)
    except:
        print('Missing args:')
        print('> python3 data-server.py PORT TAILNUMBER API_IP API_PORT')
        exit()
    

if __name__ == '__main__':
    PORT = int(argv[1])
    TAILNUMBER = str(argv[2])
    API_IP = argv[3]
    API_PORT = argv[4]

    server_thread=Thread(target=server)
    check_in_thread = Thread(target=check_in)
    
    server_thread.start()
    check_in_thread.start()
    
    server_thread.join()
    check_in_thread.join()
    
    

    
