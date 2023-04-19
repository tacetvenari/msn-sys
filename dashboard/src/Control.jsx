import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  ListItem,
  Select,
  Stack,
  Text,
  Tooltip,
  UnorderedList
} from '@chakra-ui/react'
import { InfoIcon } from "@chakra-ui/icons"
import msnActions from './msnActions'
import mxActions from './mxActions'
import useActionLog from './useActionLog'
import useLocalStorage from './useLocalStorage'
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

function ActionButton({label, desc, handler, connectionCode}){
  const isDisabled = connectionCode !== 1

  return (
    <Tooltip label={desc} placement="right" openDelay={1000} aria-label={`${label}-tooltip`}>
      <Button onClick={handler} disabled={isDisabled}>{label}</Button>
    </Tooltip>
  )
}

ActionButton.defaultProps = {
  connectionCode: 0
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  connectionCode: PropTypes.number
}

function ActionInput({label, desc, localStorageKey, defaultValue, connectionCode}){
  const [localVal, setLocalVal] = useLocalStorage(localStorageKey, defaultValue)
  const isDisabled = connectionCode !== 1

  // Hacky way to force the default value to be written to localStorage before the user edits the default value
  // This is needed since the unmodified value is not initially written - there is an action that relies on this being in localstorage
  if(!window.localStorage.getItem(localStorageKey)) setLocalVal(defaultValue)

  const handleChange = (e) => setLocalVal(e.target.value)
  return (
    <HStack>
      <Text fontWeight="bold" flexGrow={1} noOfLines={1}>{label}</Text>
      <Tooltip label={desc} placement="top-start" openDelay={1000} aria-label={`${label}-tooltip`}>
        <InfoIcon />
      </Tooltip>
      <Input value={localVal} onChange={handleChange} flexBasis="60%" placeholder={label} disabled={isDisabled} />
    </HStack>
  )
}

ActionInput.defaultProps = {
  connectionCode: 0
}

ActionInput.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  localStorageKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  connectionCode: PropTypes.number
}

function ActionSelect({label, desc, handler, options, connectionCode}){
  const isDisabled = connectionCode !== 1
  const handleChangeValue = (event) => {
    handler()(event.target.value)
  }

  return(
    <HStack spacing={4}>
      <Text fontWeight="bold" flexGrow={1} noOfLines={1}>{label}</Text>
      <Tooltip label={desc} placement="top-start" openDelay={1000} aria-label={`${label}-tooltip`}>
        <InfoIcon />
      </Tooltip>
      <Select flexBasis="60%" onChange={handleChangeValue} disabled={isDisabled}>
        { options.map(opt => (
          <option key={`option-${opt.value}`} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    </HStack>
  )
}

ActionSelect.defaultProps = {
  options: [],
  connectionCode: 0
}

ActionSelect.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string
  })),
  connectionCode: PropTypes.number
}

function ActionsCard({title, actions, wsUrl, logKey}){
  const [actionLog, logItem, clearLog] = useActionLog(logKey)
  const { sendMessage, lastMessage, connectionStatus, statusCode } = usePersistentSocket(wsUrl);

  React.useEffect(() => {
    if (lastMessage && lastMessage.type === 'message'){
      logItem(lastMessage)
    }
  }, [logItem, lastMessage])

  return (
    <Card w="36rem">
      <CardBody>
        <Stack>
          <HStack>
            <ConnectionStatus state={connectionStatus} />
            <Heading size="md">{title}</Heading>
          </HStack>
          <Stack>
            <Stack bg="gray.800" p={4} borderRadius={4} h="20em">
              <Button onClick={clearLog}>Clear Log</Button>
              <UnorderedList styleType="none">
                { actionLog.map(item => {
                  const [msgId, timestamp, msg] = item.split('::')
                  return (<ListItem key={msgId}>{`${timestamp} - ${msg}`}</ListItem> )
                })}
              </UnorderedList>
            </Stack>
          </Stack>
          { actions.map(({type, label, desc, handler, localStorageKey, defaultValue, options}) => {
            let component
            if(type === "button"){
              component = (
                <ActionButton key={label} label={label} desc={desc} handler={() => handler(sendMessage)} connectionCode={statusCode}  />
              )
            }
            else if(type === "input"){
              component = (<ActionInput key={label} label={label} desc={desc} localStorageKey={localStorageKey} defaultValue={defaultValue} connectionCode={statusCode} />)
            }
            else if(type === "select"){
              component = (<ActionSelect key={label} label={label} desc={desc} options={options} handler={() => handler(sendMessage)} connectionCode={statusCode} />)
            }
            return component
          })}
        </Stack>
      </CardBody>
    </Card>
  )
}

ActionsCard.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    desc: PropTypes.string,
    handler: PropTypes.func
  })).isRequired,
  wsUrl: PropTypes.string.isRequired,
  logKey: PropTypes.string.isRequired
}

export default function Control(){
  const mxUrl = `ws://${VITE_WS_MX_URI}:${VITE_WS_MX_PORT}/${VITE_WS_MX_CONTROL_PATH}`;
  const msnUrl = `ws://${VITE_WS_MSN_URI}:${VITE_WS_MSN_PORT}/${VITE_WS_MSN_CONTROL_PATH}`;

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <HStack align="stretch">
        <ActionsCard title="ALIS" actions={mxActions} wsUrl={mxUrl} logKey="mx-action-log"/>
        <ActionsCard title="TBMCS" actions={msnActions} wsUrl={msnUrl} logKey="msn-action-log" />
      </HStack>
    </Flex>
  )
}

