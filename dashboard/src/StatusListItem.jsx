import PropTypes from 'prop-types'
import { Circle, Heading, HStack } from '@chakra-ui/react'

export default function StatusListItem({label, value}){
  const statusColor = {
    "good": "green.500",
    "bad": "red.500",
    "unk": "gray.500"
  }

  return (
    <HStack spacing={4}>
      <Circle size={8} bg={statusColor[value]} />
      <Heading textTransform="uppercase" letterSpacing={8}>{label}</Heading>
    </HStack>
  )
}

StatusListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
