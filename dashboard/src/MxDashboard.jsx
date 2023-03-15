import React from 'react'
import useWebSocket from 'react-use-websocket'
import AircraftList from './AircraftList'
import Layout from './Layout'

const {VITE_WS_MX_URI, VITE_WS_MX_PORT, VITE_WS_MX_PATH} = import.meta.env
const TAIL_NUMBERS = ["tv-01", "tv-02", "tv-05", "tv-06"]

export default function MxDashboard(){
  const [mxState, setMxState] = React.useState([])
  const { lastMessage } = useWebSocket(`ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}/${VITE_WS_MX_PATH}`);

  React.useEffect(() => {
    if(lastMessage){
      setMxState(JSON.parse(lastMessage.data))
    }
  }, [lastMessage])
  
  return (
    <Layout subtitle="Autonomic Logistics Information System">
      <AircraftList aircraft={TAIL_NUMBERS} mxData={mxState} />
    </Layout>
  )
}
