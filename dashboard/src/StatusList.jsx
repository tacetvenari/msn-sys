import { Stack, StackDivider } from '@chakra-ui/react'
import StatusListItem from './StatusListItem'

const statuses = [
  { label: "nav", state: "good" },
  { label: "hyd", state: "good" },
  { label: "fuel", state: "good" },
  { label: "rad", state: "good" },
  { label: "wpn", state: "good" },
  { label: "lo", state: "good" },
]

export default function StatusList(){
  return (
    <Stack divider={<StackDivider />}>
      {statuses.map(status => (
          <StatusListItem key={`${status.label}-item`} status={status} />
        ))}
    </Stack>
  )
}
