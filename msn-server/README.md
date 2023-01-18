# Mission Server

Fetch data from data-servers and serve mission JSON to dashboard

## Getting started
Start the server:
```
make start
```

You can modify `DATA_SERVERS` in `msn-server.py` to change what servers the fetch compiles from.

### GET
HTTP GET a JSON response of `msn-data.json`:
```
make get
```

### POST
Have the mission server fetch data from the data servers:
```
make fetch
```

Clear `msn-data.json`:
```
make reset
```
