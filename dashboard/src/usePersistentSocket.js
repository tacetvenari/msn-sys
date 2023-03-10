import { useEffect, useRef } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export default function usePersistentSocket(url, opts){
  const didUnmount = useRef(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(url,{
    shouldReconnect: () => didUnmount.current === false,
    reconnectAttempts: 10,
    reconnectInterval: 1000,
    ...opts
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: { label: 'Connecting', color: 'gray.500'},
    [ReadyState.OPEN]: { label: 'Open', color: 'green.500'},
    [ReadyState.CLOSING]: { label: 'Closing', color: 'gray.500'},
    [ReadyState.CLOSED]: { label: 'Closed', color: 'gray.500'},
    [ReadyState.UNINSTANTIATED]: { label: 'Uninstantiated', color: 'gray.500'},
  }[readyState];

  useEffect(() => () => didUnmount.current === true)

  return { 
    sendMessage,
    lastMessage,
    readyState,
    connectionStatus
  }
}
