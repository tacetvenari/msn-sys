import pytest
import asyncio
from unittest import mock
import asynctest
import mx_data_server.server

@pytest.mark.asyncio
async def test_check_in():
    PORT = 8000
    TAILNUMBER = 'tv-01'
    API_IP = '127.0.0.1'
    API_PORT = '8888'

    mock_websocket = mock.MagicMock()
    mock_websocket.recv.side_effect = [
        'Checking in',
        f"Checked in {{'name': '{TAILNUMBER}', 'url': 'http://{API_IP}:{PORT}'}}",
        'CLOSE'
    ]

    with mock.patch('mx_data_server.server.connect') as mock_connect:
        mock_connect.return_value.__aenter__.return_value = mock_websocket

        await mx_data_server.server.check_in(True, PORT, TAILNUMBER, API_IP, API_PORT)

        mock_connect.assert_called_once_with(f"ws://{API_IP}:{API_PORT}/check-in")
        mock_websocket.send.assert_called_once_with(f"check-in {API_IP} {PORT} {TAILNUMBER}")
        mock_websocket.recv.assert_called_with()

# Run the test
if __name__ == '__main__':
    pytest.main()
