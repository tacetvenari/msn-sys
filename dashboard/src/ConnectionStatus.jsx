import PropTypes from 'prop-types'
import {
  Circle,
} from '@chakra-ui/react'
import {ReadyState} from 'react-use-websocket'

export default function ConnectionStatus({readyState}){
  const connectionStatus = {
    [ReadyState.CONNECTING]: { label: 'Connecting', color: 'gray.500'},
    [ReadyState.OPEN]: { label: 'Open', color: 'green.500'},
    [ReadyState.CLOSING]: { label: 'Closing', color: 'gray.500'},
    [ReadyState.CLOSED]: { label: 'Closed', color: 'gray.500'},
    [ReadyState.UNINSTANTIATED]: { label: 'Uninstantiated', color: 'gray.500'},
  }[readyState];

  return (
      <Circle size={3} bg={connectionStatus.color} transition="all 0.25s" />
  )
}

ConnectionStatus.defaultProps = {
  readyState: -1
}

ConnectionStatus.propTypes = {
  readyState: PropTypes.number
}

