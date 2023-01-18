from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.request import urlopen
import json

DATA_SERVERS = [
        "http://localhost:8008",
        "http://localhost:8009",
        "http://localhost:8010",
        "http://localhost:8011"
    ]

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    # GET sends back a Hello world message
    def do_GET(self):
        with open('msn-data.json') as file:
            data = json.load(file)
            self._set_headers()
            self.wfile.write(json.dumps(data).encode('utf-8'))
            file.close()

    def do_POST(self):
        post_data = self.rfile.read(int(self.headers.get('Content-Length'))).decode()
        if post_data == "fetch":
            with open('msn-data.json', 'w') as msn_data_file:
                msn_data_file.write(f"[\n")
                for idx, data_server in enumerate(DATA_SERVERS):
                    content = urlopen(data_server).read().decode()
                    if (idx + 1) == len(DATA_SERVERS):
                        msn_data_file.write(f"{content}\n")
                    else:
                        msn_data_file.write(f"{content},\n")
                msn_data_file.write(f"]\n")
                self._set_headers()
                self.wfile.write("{\"mission_fetch\": \"complete\"}".encode('utf-8'))
                msn_data_file.close()

        elif post_data == "reset":
            with open('msn-data.json', 'w') as msn_data_file:
                msn_data_file.write(f"[]")
                self._set_headers()
                self.wfile.write("{\"reset\": \"complete\"}".encode('utf-8'))
                msn_data_file.close()

def run(server_class=HTTPServer, handler_class=Server, port=8888):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting httpd on port %d...' % port)
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
