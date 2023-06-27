import pytest
from unittest import mock
import mx_api_server.server

@pytest.mark.asyncio
async def test_correct_check_in():
    # Set up the mock websocket connection
    websocket = mock.Mock()
    connections = {'/check-in': {websocket}}

    # Patch the websockets.broadcast function
    with mock.patch('mx_api_server.server.websockets.broadcast') as mock_broadcast:
        # Call the function under test
        await mx_api_server.server.check_in('check-in 127.0.0.1 8000 tv-01')

        # Assert that the expected messages are broadcasted
        assert mock_broadcast.call_count == 3
        assert mock_broadcast.call_args_list == [
            mock.call(set(), 'Checking in'),
            mock.call(set(), "Checked in {'name': 'tv-01', 'url': 'http://127.0.0.1:8000'}"),
            mock.call(set(), 'CLOSE')
        ]

@pytest.mark.asyncio
async def test_badIP_check_in():
    # Set up the mock websocket connection
    websocket = mock.Mock()
    connections = {'/check-in': {websocket}}

    # Patch the websockets.broadcast function
    with mock.patch('mx_api_server.server.websockets.broadcast') as mock_broadcast:
        # Call the function under test
        await mx_api_server.server.check_in('check-in 0 8000 tv-01')

        # Assert that the expected messages are broadcasted
        assert mock_broadcast.call_count == 2
        assert mock_broadcast.call_args_list == [
            mock.call(set(), 'Checking in'),
            mock.call(set(), "FAIL: '0' is not a valid ip_address"),
        ]

@pytest.mark.asyncio
async def test_badPort_check_in():
    # Set up the mock websocket connection
    websocket = mock.Mock()
    connections = {'/check-in': {websocket}}

    # Patch the websockets.broadcast function
    with mock.patch('mx_api_server.server.websockets.broadcast') as mock_broadcast:
        # Call the function under test
        await mx_api_server.server.check_in('check-in 127.0.0.1 100000 tv-01')

        # Assert that the expected messages are broadcasted
        assert mock_broadcast.call_count == 2
        assert mock_broadcast.call_args_list == [
            mock.call(set(), 'Checking in'),
            mock.call(set(), "FAIL: '100000' is not a valid port"),
        ]

@pytest.mark.asyncio
async def test_badName_check_in():
    # Set up the mock websocket connection
    websocket = mock.Mock()
    connections = {'/check-in': {websocket}}

    # Patch the websockets.broadcast function
    with mock.patch('mx_api_server.server.websockets.broadcast') as mock_broadcast:
        # Call the function under test
        await mx_api_server.server.check_in('check-in 127.0.0.1 8000 1-01')

        # Assert that the expected messages are broadcasted
        assert mock_broadcast.call_count == 2
        assert mock_broadcast.call_args_list == [
            mock.call(set(), 'Checking in'),
            mock.call(set(), "FAIL: '1-01' is not a valid data server"),
        ]

# Run the tests
if __name__ == '__main__':
    pytest.main()
