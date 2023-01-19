import {
  Button,
  Card,
  CardBody,
  Circle,
  Flex,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

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
              <Button>Compile Mission Data</Button>
              <Button>Publish Mission Data</Button>
              <Button>Launch Sortie</Button>
              <Button disabled>Cancel Sortie</Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Flex>
  )
}

