import PropTypes from 'prop-types'
import {
  Circle,
} from '@chakra-ui/react'

export default function ConnectionStatus({state}){
  return (
      <Circle size={3} bg={state.color} transition="all 0.25s" />
  )
}

ConnectionStatus.defaultProps = {
  state: {
    color: 'gray.500'
  }
}

ConnectionStatus.propTypes = {
  state: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
  })
}

