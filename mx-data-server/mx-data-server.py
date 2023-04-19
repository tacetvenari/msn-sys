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

if __name__ == '__main__':
    from sys import argv

    try:
        PORT = int(argv[1])
        TAILNUMBER = str(argv[2])
        run(port=PORT, tailnumber=TAILNUMBER)

    except:
        print('Missing args:')
        print('> python3 data-server.py [PORT] [TAILNUMBER]')
