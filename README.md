# [WIP] MSN SYS

A modern lightweight mission system used to support TV events. It provides MDTs a working system to defend while also simplifying White Cell monitoring and execution.

## Components

### Dashboard (`./dashboard`)

This exposes a dashboard UI (`5173` by default) that connects to the two API servers via websockets. The valid routes are:

 - `/` - Displays links to the two available dashboards
 - `/msn` - Mission dashboard
 - `/mx` - Maintenance dashboard
 - `/control` - Control UI for both dashboards

 There is a catch all view for all other routes that discourages participants from enumerating the url paths

### MSN API Server (`./msn-api-server`)

This starts a websocket server (`8889`) that registers clients in `dashboard` and `controller` groups. Controllers can issue commands to the API server, while Dashboards may receive data as a result of websocket commands.

### MSN Data Server (`./msn-data-server`)

This server exposes a couple REST endpoints to send/receive data (`8012` by default).

  - GET `/` will return the content of `./data.json`
  - POST `/` will write the request content to `./log`

### MX API Server (`./mx-api-dashboard`)

This starts a websocket server (`8888` by default) that registers clients in `dashboard` and `controller` groups. Controllers can issue commands to the API server, while Dashboards may receive data as a result of websocket commands.

### MX Data Server (`./mx-data-server`)

This server exposes a couple REST endpoints to send/receive data (`8008` by default).

  - GET `/` will return the content of `./data.json`
  - POST `/` will write the request content to `./log`

# DOCKER NOTES
  The computers viewing the dashboard need access to API Containers!