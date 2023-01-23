import {
  Button,
  Card,
  CardBody,
  Circle,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import actions from './actions'

const servers = ["Data Server 1", "Data Server 2", "Data Server 3", "Data Server 4", "Mission Server"]

function ServerStatus({label}){
  return (
    <HStack align="center">
      <Circle size={3} bg="green" />
      <Text>{label}</Text>
    </HStack>
  )
}

ServerStatus.propTypes = {
  label: PropTypes.string.isRequired
}

function ActionButton({label, desc, handler}){
  return (
    <Tooltip label={desc} placement="right" openDelay={1000} aria-label={`${label}-tooltip`}>
      <Button onClick={handler}>{label}</Button>
    </Tooltip>
  )
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

export default function Admin(){
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Stack w="20vw">
        <Card>
          <CardBody>
            <Stack>
              <Heading size="md">Server Connections</Heading>
              { servers.map(label => (
                <ServerStatus key={`${label}-status`} label={label} />
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stack>
              <Heading size="md">Sortie Actions</Heading>
              <HStack>
                <Heading size="s">Last Action:</Heading>
                <Text>None</Text>
              </HStack>
              { actions.map(({label, desc, handler}) => (
                <ActionButton key={label} label={label} desc={desc} handler={handler} />
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Flex>
  )
}
