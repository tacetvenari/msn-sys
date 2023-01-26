import PropTypes from 'prop-types'
import { Stack, StackDivider } from '@chakra-ui/react'
import StatusListItem from './StatusListItem'

const statuses = ["nav", "hyd", "fuel", "rad", "wpn", "lo"]

export default function StatusList({data, delay}){  
  return (
    <Stack divider={<StackDivider />}>
      {statuses.map((status, idx) => {
        const value = data[status] || "unk"
        const combinedDelay = (idx * 0.5) + delay

         return (
          <StatusListItem key={`${status}-item`} label={status} value={value} delay={combinedDelay} />
        )})}
    </Stack>
  )
}

StatusList.defaultProps = {
  delay: 0
}

StatusList.propTypes = {
  data: PropTypes.shape({
    nav: PropTypes.string
  }).isRequired,
  delay: PropTypes.number
}
