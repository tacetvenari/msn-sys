import PropTypes from 'prop-types'
import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import StatusList from './StatusList'

export default function AircraftCard({aircraft, data}){
  return (
    <Card>
      <CardBody>
        <Stack>
          <Heading size="md" textTransform="uppercase" >F-35 {aircraft}</Heading>
          <Image src="f35-standby.jpg" borderRadius={4} />
          <StatusList data={data} />
        </Stack>
      </CardBody>
    </Card>
  )
}

AircraftCard.defaultProps = {
  data: {}
}

AircraftCard.propTypes = {
  aircraft: PropTypes.string.isRequired,
  data: PropTypes.shape({
    nav: PropTypes.string
  })
}
