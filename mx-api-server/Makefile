LOCAL_IP=$$(python3 -c 'import socket; ip=socket.gethostbyname(socket.gethostname()); print(ip)')
WS_PORT=8888

start:
	python3 ./mx-api-server.py ${LOCAL_IP} ${WS_PORT}

control:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/mx-controller

dash:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/mx-dashboard

sortie:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/mx-sortie-state
