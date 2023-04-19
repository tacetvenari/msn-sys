import PropTypes from 'prop-types'
import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import StatusList from './StatusList'

export default function AircraftCard({aircraft, data, idx, sortieState}){
  const delay = idx * 3 // 6 statuses * 0.5 seconds

  const images = {
    takeoff: 'f35-flying.jpg',
    land: 'f35-standby.jpg',
    canx: 'f35-canx.jpg'
  }

  return (
    <Card>
      <CardBody>
        <Stack>
          <Heading size="md" textTransform="uppercase" >F-35 {aircraft}</Heading>
          <Image src={images[sortieState]} borderRadius={4} />
          <StatusList data={data} delay={delay} />
        </Stack>
      </CardBody>
    </Card>
  )
}

AircraftCard.defaultProps = {
  data: {},
  idx: 0,
  sortieState: "land"
}

AircraftCard.propTypes = {
  aircraft: PropTypes.string.isRequired,
  data: PropTypes.shape({
    nav: PropTypes.string
  }),
  idx: PropTypes.number,
  sortieState: PropTypes.string
}
