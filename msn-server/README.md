# Mission Server

Fetch data from data-servers and serve mission JSON to dashboard

## Getting started
Start the server:
```
Make start
```

### GET
HTTP GET a JSON response of `msn-data.json`:
```
curl http://localhost:8888
```

### POST
Have the mission server fetch data from the data servers:
```
curl -d "fetch" http://localhost:8888
```
