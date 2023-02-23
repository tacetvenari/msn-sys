import PropTypes from 'prop-types'
import {
  Card,
  Circle,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

const {VITE_MSN_NUMBER, VITE_MSN_PLATFORM, VITE_MSN_TAKEOFF, VITE_MSN_RETURN, VITE_SHOPS} = import.meta.env
const SHOPS = VITE_SHOPS.split(' ')

function MetaSection({label, value}){
  const metaFontSize = "1.5em"
  return (
    <HStack>
      <Text fontSize={metaFontSize} fontWeight="bold">{`${label}:`}</Text>
      <Text fontSize={metaFontSize}>{value.toUpperCase()}</Text>
    </HStack>
  )
}

MetaSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

function MissionMeta({target}){
  return (
    <Stack>
      <Heading size="md">Mission Data</Heading>
      <Divider />
      <HStack justifyContent="center" spacing={16}>
        <MetaSection label="Takeoff" value={VITE_MSN_TAKEOFF} />
        <MetaSection label="Return" value={VITE_MSN_RETURN} />
        <MetaSection label="Platform" value={VITE_MSN_PLATFORM} />
        <MetaSection label="Target" value={target} />
      </HStack>
    </Stack>
  )
}

MissionMeta.defaultProps = {
  target: "unk"
}

MissionMeta.propTypes = {
  target: PropTypes.string
}

function Status({label, state, delay}){
  // TODO: Set timeout to remove animation so it reruns on rerender
  // Random key is not viable - prevents transition from occurring

  const statusColor = {
    "good": "green.500",
    "unk": "gray.500"
  }

  return (
    <HStack>
      <Circle size={10} bg={statusColor[state]} transition={`all 0.5s ${delay}s`} />
      <Text fontSize="2em" fontWeight="bold">{label.toUpperCase()}</Text>
    </HStack>
  )
}

Status.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired
}

function MissionStatus({states}){
  return (
    <Stack>
      <Heading size="md">Mission Status</Heading>
      <Divider />
      <HStack justifyContent="center" spacing={8}>
        {SHOPS.map((shop, idx) => {
          const currentState = states[shop] ? states[shop].status : 'unk'
          const delay = idx * 0.5

          return(
            <Status key={shop} label={shop} state={currentState} delay={delay} />
          )})}
      </HStack>
    </Stack>
  )
}

MissionStatus.propTypes = {
  states: PropTypes.shape({
    intel: PropTypes.string
  }).isRequired
}

export default function AirTaskingOrderCard({msnData}){
  const {target, ...states} = msnData

  return (
    <Card px={4} py={2}>
      <Stack spacing={6}>
        <Heading size="lg">{`Mission ${VITE_MSN_NUMBER}`}</Heading>
        <MissionStatus states={states} />
        <MissionMeta target={target}/>
      </Stack>
    </Card>
  )
}

AirTaskingOrderCard.propTypes = {
  msnData: PropTypes.shape({
    target: PropTypes.string,
    intel: PropTypes.shape({})
  }).isRequired,
}
