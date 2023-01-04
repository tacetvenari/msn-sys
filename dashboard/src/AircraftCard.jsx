import PropTypes from 'prop-types'
import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import StatusList from './StatusList'

export default function AircraftCard({aircraft}){
  return (
    <Card>
      <CardBody>
        <Stack>
          <Heading size="md">F-35 {aircraft}</Heading>
          <Image src="f35-standby.jpg" borderRadius={4} />
          <StatusList />
        </Stack>
      </CardBody>
    </Card>
  )
}

AircraftCard.propTypes = {
  aircraft: PropTypes.string.isRequired
}
