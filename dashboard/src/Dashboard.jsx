import React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Button } from '@chakra-ui/react'
import AircraftList from './AircraftList'
import Layout from './Layout'

export default function Dashboard(){
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8889');
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  React.useEffect(() => {
    console.log(`state: ${connectionStatus}`)
  }, [connectionStatus])

  React.useEffect(() => {
    console.log(lastMessage)
  }, [lastMessage])

  /* const socket = new WebSocket('ws://localhost:8889')
 
  // Connect to websocket
  socket.addEventListener('open', () => {
      socket.send('Hello World')
  })

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log(event.data);
  });

  const handleButtonClick = () => {
    socket.send("Initialize");
  } */

  const handleButtonClick = () => sendMessage('Hello')
  
  return (
    <Layout>
      <AircraftList />
      <Button onClick={handleButtonClick}>Test</Button>
    </Layout>
  )
}
