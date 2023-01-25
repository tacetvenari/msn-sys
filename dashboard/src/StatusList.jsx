import PropTypes from 'prop-types'
import { Stack, StackDivider } from '@chakra-ui/react'
import StatusListItem from './StatusListItem'

const statuses = ["nav", "hyd", "fuel", "rad", "wpn", "lo"]

export default function StatusList({data}){  
  return (
    <Stack divider={<StackDivider />}>
      {statuses.map(status => {
        const value = data[status] || "unk"

         return (
          <StatusListItem key={`${status}-item`} label={status} value={value} />
        )})}
    </Stack>
  )
}

StatusList.propTypes = {
  data: PropTypes.shape({
    nav: PropTypes.string
  }).isRequired
}
