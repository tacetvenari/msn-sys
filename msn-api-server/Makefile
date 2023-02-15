#LOCAL_IP=$(ipconfig en0 | grep -i mask | awk '{print $2}')
LOCAL_IP=192.168.0.88
WS_PORT=8888

start:
	python3 ./msn-server.py

controller:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/controller

dashboard:
	python3 -m websockets ws://${LOCAL_IP}:${WS_PORT}/dashboard
