import { useState } from 'react'
import useLocalStorage from './useLocalStorage'

const MAX_LOG_ITEMS = 10

const initialLog = []

export default function useActionLog(key){
  const [ lastMessageId, setLastMessageId ] = useState('0')
  const [actionLog, setActionLog] = useLocalStorage(key, initialLog)

  // Add items to the log, keep only the last MAX_LOG_ITEMS number of items
  const logItem = (item) => {
    const { timeStamp, data } = item
    const msgId = timeStamp.toString() // Message timeStamp is based on browser window rendering? - use as message id

    if(lastMessageId !== msgId){ 
      // Format log message
      const now = new Date(Date.now())
      const logMessage = `${msgId}::${now.toLocaleDateString()} ${now.toLocaleTimeString()}::${data}`
      setLastMessageId(msgId)
      if (actionLog.length >= MAX_LOG_ITEMS){
        const newLog = actionLog.slice(1, MAX_LOG_ITEMS)
        newLog.push(logMessage)
        setActionLog(newLog)
      }
      else {
        setActionLog([...actionLog, logMessage])
      }
    } 
  }

  const clearLog = () => setActionLog(initialLog)

  return [actionLog, logItem, clearLog]
}
