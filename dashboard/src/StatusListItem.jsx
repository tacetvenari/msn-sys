import PropTypes from 'prop-types'
import { Circle, Heading, HStack } from '@chakra-ui/react'

export default function StatusListItem({status}){
  return (
    <HStack spacing={4}>
      <Circle size={8} bg="green.500" />
      <Heading textTransform="uppercase">{status.label}</Heading>
    </HStack>
  )
}

StatusListItem.propTypes = {
  status: PropTypes.shape({
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }).isRequired
}
