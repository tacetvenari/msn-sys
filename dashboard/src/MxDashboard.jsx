import React from 'react'
import AircraftList from './AircraftList'
import Layout from './Layout'
import usePersistentSocket from './usePersistentSocket'


const {VITE_WS_MX_URI, VITE_WS_MX_PORT, VITE_WS_MX_PATH, VITE_WS_MX_SORTIE_PATH} = import.meta.env
const TAIL_NUMBERS = ["tv-01", "tv-02", "tv-05", "tv-06"]

export default function MxDashboard(){
  const [mxState, setMxState] = React.useState([])
  const [sortieState, setSortieState] = React.useState("land")
  const { lastMessage, connectionStatus } = usePersistentSocket(`ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}${VITE_WS_MX_PATH}`);
  const { lastMessage: lastSortieMessage } = usePersistentSocket(`ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}${VITE_WS_MX_SORTIE_PATH}`);


  React.useEffect(() => {
    if(lastMessage){
      setMxState(JSON.parse(lastMessage.data))
    }
  }, [lastMessage])
  
  React.useEffect(() => {
    if(lastSortieMessage){
      setSortieState(lastSortieMessage.data)
    }
  }, [lastSortieMessage])
  
  return (
    <Layout subtitle="Autonomic Logistics Information System" connectionStatus={connectionStatus}>
      <AircraftList aircraft={TAIL_NUMBERS} mxData={mxState} sortieState={sortieState} />
    </Layout>
  )
}
