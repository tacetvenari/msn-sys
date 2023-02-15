# Data Server
Serve JSON over HTTP

## Getting started
Start the server:
```
make start p=PORT f=filename
make start1
make start2
make start3
make start4
```
You can modify the `Makefile` to adjust ports and files to serve.

### GET
HTTP GET a JSON response of `data.json`:
```
curl http://localhost:8008
```

### POST
HTTP POST some data to `log`:
```
curl -d "some data" http://localhost:8008
```
