from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib import parse
import base64
import json
import shutil
import socket
from time import sleep
from threading import Thread
from websockets.sync.client import connect
from sys import argv

CHECKIN_TIMER=5
IPADDR=socket.gethostbyname(socket.gethostname())

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Origin', 'http://192.168.0.89:5173')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")

    def do_HEAD(self):
        self._set_headers()

    # GET returns MSN JSON data based on path
    def do_GET(self):
        files = {
            "/": "msn-data.json",
            "/restore": "backup-msn-data.json",
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
                data = {}
                shopData = json.load(file)

                # If not intel, strip msn meta data
                if SHOP.lower() == "intel":
                    data[SHOP] = shopData
                else:
                    data[SHOP] = {key:shopData[key] for key in shopData if key == 'status'}

                self._set_headers()
                self.wfile.write(json.dumps(data).encode('utf-8'))

                file.close()

    # POST writes data to log and returns the data written
    def do_POST(self):
        if self.path == "/":
            with open('log', 'a') as log:
                content = self.rfile.read(int(self.headers.get("Content-Length")))
                log.write(f'{content.decode()}\n')

                self._set_headers()
                self.wfile.write(content)

                log.close()
        elif self.path == "/updateMsn":
            base64_content = parse.unquote_plus(self.rfile.read(int(self.headers.get("Content-Length"))).decode("utf-8").split("data=")[1])
            new_content = json.loads(base64.b64decode(base64_content))
            content = {}

            # Read file
            with open("msn-data.json", "r") as msnfile:
                content = json.load(msnfile)
                msnfile.close()

            # Update content
            for key in new_content:
                content[key] = new_content[key]

            # Write file
            with open("msn-data.json", "w") as msnfile:
                json.dump(content, msnfile)
                msnfile.close()

            message = { "message" : "Intel mission data updated"}

            self._set_headers()
            self.wfile.write(json.dumps(message).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=Server, port='8008', shop='unk'):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting %s Data Server on port %d...' % (shop.upper(), port))
    httpd.serve_forever()

def check_in(test, PORT, TAILNUMBER, API_IP, API_PORT):
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
        if test == True:
            break

def server():
    try:
        run(port=PORT, shop=SHOP)

    except:
        print('Missing args:')
        print('> python server.py PORT SHOP API_IP API_PORT')
        exit()


if __name__ == '__main__':
    PORT = int(argv[1])
    SHOP = str(argv[2])
    API_IP = argv[3]
    API_PORT = argv[4]

    server_thread=Thread(target=server)
    check_in_thread = Thread(target=check_in, args=[False, PORT, SHOP, API_IP, API_PORT])

    server_thread.start()
    check_in_thread.start()

    server_thread.join()
    check_in_thread.join()




