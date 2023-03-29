import { useEffect, useRef } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export default function usePersistentSocket(url, opts){
  const didUnmount = useRef(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(url,{
    shouldReconnect: () => didUnmount.current === false,
    reconnectAttempts: 1440, // At 5 second interval, this will try for 2 hours
    reconnectInterval: 5000,
    ...opts
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: { label: 'Connecting', color: 'yellow.500'},
    [ReadyState.OPEN]: { label: 'Open', color: 'green.500'},
    [ReadyState.CLOSING]: { label: 'Closing', color: 'red.500'},
    [ReadyState.CLOSED]: { label: 'Closed', color: 'red.500'},
    [ReadyState.UNINSTANTIATED]: { label: 'Uninstantiated', color: 'gray.500'},
  }[readyState];

  useEffect(() => () => didUnmount.current === true)

  return { 
    sendMessage,
    lastMessage,
    readyState,
    connectionStatus,
    statusCode: readyState
  }
}
