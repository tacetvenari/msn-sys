LOCAL_IP=$$(ifconfig en0 | awk '/inet / {print $$2}')
WS_PORT=8889

start:
	python3 ./msn-api-server.py ${LOCAL_IP} ${WS_PORT}

control:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/msn-controller

dash:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/msn-dashboard
