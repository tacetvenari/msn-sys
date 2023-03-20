import React from 'react'
import useWebSocket from 'react-use-websocket'
import {
  Stack,
} from '@chakra-ui/react'

import Layout from './Layout'
import AirTaskingOrderCard from './AirTaskingOrderCard'
import Map from './Map'

const {VITE_LOCAL_IP, VITE_WS_MSN_PORT, VITE_WS_MSN_PATH} = import.meta.env

export default function MsnDashboard(){
  const [msnState, setMsnState] = React.useState({ intel: {}})
  const { lastMessage } = useWebSocket(`ws://${VITE_LOCAL_IP}:${VITE_WS_MSN_PORT}${VITE_WS_MSN_PATH}`);

  React.useEffect(() => {
    if(lastMessage){
      setMsnState(JSON.parse(lastMessage.data))
    }
  }, [lastMessage])
  
  return (
    <Layout subtitle="Theater Battle Management Core System">
      <Stack justifyContent="center" w="40vw" margin="auto">
        <Map />
        <AirTaskingOrderCard msnData={msnState} />
      </Stack>
    </Layout>
  )
}
