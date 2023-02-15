LOCAL_IP=$$(ifconfig en0 | awk '/inet / {print $$2}')
WS_PORT=8888

start:
	python3 ./mx-api-server.py ${LOCAL_IP} ${WS_PORT}

controller:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/controller

dashboard:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/dashboard
