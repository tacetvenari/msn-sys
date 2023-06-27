from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib import parse
import base64
import json
import logging
from sys import argv

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    # POST writes data to log and returns the data written
    def do_POST(self):
        if self.path == "/":
            with open('log', 'a') as log:
                content = self.rfile.read(int(self.headers.get("Content-Length")))
                logging.info("received")
                self._set_headers()
                self.wfile.write(content)

        elif self.path == "/updateMX":
            base64_content = parse.unquote_plus(self.rfile.read(int(self.headers.get("Content-Length"))).decode("utf-8").split("data=")[1])
            new_content = json.loads(base64.b64decode(base64_content))
            content = {}

            # Read file
            with open("mx-data.json", "r") as msnfile:
                content = json.load(msnfile)
                msnfile.close()

            # Update content
            for key in new_content:
                content[key] = new_content[key]

            # Write file
            with open("mx-data.json", "w") as msnfile:
                json.dump(content, msnfile)
                msnfile.close()

            message = { "message" : "MX data updated"}

            self._set_headers()
            self.wfile.write(json.dumps(message).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=Server, port=8008, name='unk'):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting %s Data Server on port %d...' % (name.upper(), port))
    httpd.serve_forever()


if __name__ == '__main__':


    try:
        PORT = int(argv[1])
        NAME = str(argv[2])
        run(port=PORT, name=NAME)

    except:
        run()
        #print('Missing args:')
        #print('> python server.py PORT SHOP API_IP API_PORT')
        #exit()





