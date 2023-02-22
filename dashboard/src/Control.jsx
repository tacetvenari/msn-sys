import React from 'react'
import PropTypes from 'prop-types'
import useWebSocket from 'react-use-websocket'
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
import msnActions from './msnActions'
import mxActions from './mxActions'

const {
  VITE_WS_MX_URI,
  VITE_WS_MX_PORT,
  VITE_WS_MX_CONTROL_PATH,
  VITE_WS_MSN_URI,
  VITE_WS_MSN_PORT,
  VITE_WS_MSN_CONTROL_PATH,
} = import.meta.env
const servers = ["MX Server", "MSN Server"]

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

function ConnectionsCard(){
  return (
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
  )
}

function ActionsCard({title, actions, wsUrl}){
  const { sendMessage, lastMessage } = useWebSocket(wsUrl);

  React.useEffect(() => {
    console.log(lastMessage)
  }, [lastMessage])

  return (
    <Card>
      <CardBody>
        <Stack>
          <Heading size="md">{title}</Heading>
          <HStack>
            <Heading size="s">Last Action:</Heading>
            <Text>None</Text>
          </HStack>
          { actions.map(({label, desc, handler}) => (
            <ActionButton key={label} label={label} desc={desc} handler={() => handler(sendMessage)} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

ActionsCard.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  })).isRequired,
  wsUrl: PropTypes.string.isRequired
}

export default function Control(){
  const mxUrl = `ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}${VITE_WS_MX_CONTROL_PATH}`;
  const msnUrl = `ws://${VITE_WS_MSN_URI}:${VITE_WS_MSN_PORT}${VITE_WS_MSN_CONTROL_PATH}`;

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Stack w="20vw">
        <ConnectionsCard />
        <ActionsCard title="ALIS" actions={mxActions} wsUrl={mxUrl}/>
        <ActionsCard title="TBMCS" actions={msnActions} wsUrl={msnUrl}/>
      </Stack>
    </Flex>
  )
}

