import React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import AircraftList from './AircraftList'
import Layout from './Layout'

export default function Dashboard(){
  const { lastMessage, readyState } = useWebSocket('ws://localhost:8888/dashboard');
  
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
  
  return (
    <Layout>
      <AircraftList />
    </Layout>
  )
}
