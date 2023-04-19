import React from 'react'
import {
  Stack,
} from '@chakra-ui/react'

import Layout from './Layout'
import AirTaskingOrderCard from './AirTaskingOrderCard'
import Map from './Map'
import usePersistentSocket from './usePersistentSocket'

const {VITE_WS_MSN_URI, VITE_WS_MSN_PORT, VITE_WS_MSN_PATH} = import.meta.env

export default function MsnDashboard(){

  const [msnState, setMsnState] = React.useState({ intel: {}})
  const { lastMessage, connectionStatus } = usePersistentSocket(`ws://${VITE_WS_MSN_URI}:${VITE_WS_MSN_PORT}${VITE_WS_MSN_PATH}`);

  React.useEffect(() => {
    if(lastMessage){
      setMsnState(JSON.parse(lastMessage.data))
    }
  }, [lastMessage])
  
  return (
    <Layout subtitle="Theater Battle Management Core System" connectionStatus={connectionStatus}>
      <Stack justifyContent="center" w="40vw" margin="auto">
        <Map />
        <AirTaskingOrderCard msnData={msnState} />
      </Stack>
    </Layout>
  )
}
