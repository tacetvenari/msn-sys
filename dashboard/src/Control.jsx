import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  ListItem,
  Stack,
  Tooltip,
  UnorderedList
} from '@chakra-ui/react'
import msnActions from './msnActions'
import mxActions from './mxActions'
import useActionLog from './useActionLog'
import usePersistentSocket from './usePersistentSocket'

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

function ActionsCard({title, actions, wsUrl, logKey}){
  const [actionLog, logItem, clearLog] = useActionLog(logKey)
  const { sendMessage, lastMessage, connectionStatus } = usePersistentSocket(wsUrl);

  React.useEffect(() => {
    if (lastMessage && lastMessage.type === 'message'){
      logItem(lastMessage)
    }
  }, [logItem, lastMessage])

  return (
    <Card h="36em">
      <CardBody>
        <Stack>
          <HStack>
            <ConnectionStatus state={connectionStatus} />
            <Heading size="md">{title}</Heading>
          </HStack>
          <Stack>
            <Stack bg="gray.800" p={4} borderRadius={4} h="20em" w="22em">
              <Button onClick={clearLog}>Clear Log</Button>
              <UnorderedList styleType="none">
                { actionLog.map(item => {
                  const [msgId, timestamp, msg] = item.split('::')
                  return (<ListItem key={msgId}>{`${timestamp} - ${msg}`}</ListItem> )
                })}
              </UnorderedList>
            </Stack>
          </Stack>
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
  wsUrl: PropTypes.string.isRequired,
  logKey: PropTypes.string.isRequired
}

export default function Control(){
  const mxUrl = `ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}/${VITE_WS_MX_CONTROL_PATH}`;
  const msnUrl = `ws://${VITE_WS_MSN_URI}:${VITE_WS_MSN_PORT}/${VITE_WS_MSN_CONTROL_PATH}`;

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <HStack align="flex-start">
        <ActionsCard title="ALIS" actions={mxActions} wsUrl={mxUrl} logKey="mx-action-log"/>
        <ActionsCard title="TBMCS" actions={msnActions} wsUrl={msnUrl} logKey="msn-action-log" />
      </HStack>
    </Flex>
  )
}

