import React from 'react'
import PropTypes from 'prop-types'
import useWebSocket from 'react-use-websocket'
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import msnActions from './msnActions'
import mxActions from './mxActions'

import ConnectionStatus from './ConnectionStatus'

const {
  VITE_WS_MX_URI,
  VITE_WS_MX_PORT,
  VITE_WS_MX_CONTROL_PATH,
  VITE_WS_MSN_URI,
  VITE_WS_MSN_PORT,
  VITE_WS_MSN_CONTROL_PATH,
} = import.meta.env

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

function ActionsCard({title, actions, wsUrl}){
  const didUnmount = React.useRef(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl,{
    shouldReconnect: () => didUnmount.current === false,
    reconnectAttempts: 10,
    reconnectInterval: 1000
  });

  React.useEffect(() => () => didUnmount.current === true)

  React.useEffect(() => {
    console.log(lastMessage)
  }, [lastMessage])

  return (
    <Card>
      <CardBody>
        <Stack>
          <HStack>
            <ConnectionStatus readyState={readyState} />
            <Heading size="md">{title}</Heading>
          </HStack>
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
        <ActionsCard title="ALIS" actions={mxActions} wsUrl={mxUrl}/>
        <ActionsCard title="TBMCS" actions={msnActions} wsUrl={msnUrl}/>
      </Stack>
    </Flex>
  )
}

