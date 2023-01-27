import React from 'react'
import useWebSocket from 'react-use-websocket'
import AircraftList from './AircraftList'
import Layout from './Layout'

const {VITE_LOCAL_IP, VITE_WS_PORT, VITE_WS_PATH} = import.meta.env
const TAIL_NUMBERS = ["tv-01", "tv-02", "tv-05", "tv-06"]

export default function Dashboard(){
  const [mxState, setMxState] = React.useState([])
  const { lastMessage } = useWebSocket(`ws://${VITE_LOCAL_IP}:${VITE_WS_PORT}${VITE_WS_PATH}`);

  React.useEffect(() => {
    if(lastMessage){
      setMxState(JSON.parse(lastMessage.data))
    }
  }, [lastMessage])
  
  return (
    <Layout>
      <AircraftList aircraft={TAIL_NUMBERS} mxData={mxState} />
    </Layout>
  )
}
