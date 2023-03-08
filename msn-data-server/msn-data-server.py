from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import shutil

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    # GET sends back a Hello world message
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
        else:
            with open(files[self.path]) as file:
                data = {}
                data[SHOP] = json.load(file)

                self._set_headers()
                self.wfile.write(json.dumps(data).encode('utf-8'))

                file.close()

    def do_POST(self):
        with open('log', 'a') as log:
            content = self.rfile.read(int(self.headers.get('Content-Length')))
            log.write(f'{content.decode()}\n')

            self._set_headers()
            self.wfile.write(content)

            log.close()

def run(server_class=HTTPServer, handler_class=Server, port='8008', shop='unk'):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting %s Data Server on port %d...' % (shop.upper(), port))
    httpd.serve_forever()

if __name__ == '__main__':
    from sys import argv

    try:
        PORT = int(argv[1])
        SHOP = str(argv[2])
        run(port=PORT, shop=SHOP)

    except:
        print('Missing args:')
        print('> python3 data-server.py [PORT] [SHOP]')
