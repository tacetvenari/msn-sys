# [WIP] MSN SYS

A modern lightweight mission system used to support TV events. It provides MDTs a working system to defend while also simplifying White Cell monitoring and execution.

## Components

### Data Server (`./data-server`)

This server exposes a couple REST endpoints to send/receive data (`8008` by default).

  - GET will return the content of `data.json`
  - POST will write the request content to `log`

### Mission Dashboard (`./msn-dashboard`)

This server exposes a UI dashboard (`80` by default) that reports on the state of data served by the Data Server.

### Mission Control (`./msn-control`)

This server exposes a UI dashbaord (`80` by default) that shows the `data-server` and `msn-dashboard` services. It allows allows facilitators to manage sortie prep and execution from a centralized location.
