function handleBuildATO(send){
  send('build')
}

function handlePublishATO(send){
  send('publish')
}

function handleWriteMsnData(send){
  function getLocalStorageItem(key){
    return JSON.parse(window.localStorage.getItem(key))
  }

  const msnId = getLocalStorageItem('tv-msn-id')
  const msnTakeoff = getLocalStorageItem('tv-msn-takeoff')
  const msnReturn = getLocalStorageItem('tv-msn-return')
  const msnPlatform = getLocalStorageItem('tv-msn-platform')
  const msnTarget = getLocalStorageItem('tv-msn-target')
  const postData = {msn_id: msnId, msn_takeoff: msnTakeoff, msn_return: msnReturn, msn_platform: msnPlatform, msn_target: msnTarget}
  const encodedData = btoa(JSON.stringify(postData))

  console.log(postData)

  send(`updateIntel ${encodedData}`)
}

export default [
  { 
    type: "input",
    label: "Mission ID",
    desc: "Mission ID on the dashboard",
    localStorageKey: 'tv-msn-id',
    defaultValue: 'UNK-TV-XX'
  },
  { 
    type: "input",
    label: "Takeoff Time",
    desc: "Mission takeoff on the dashboard",
    localStorageKey: 'tv-msn-takeoff',
    defaultValue: '1000'
  },
  { 
    type: "input",
    label: "Return Time",
    desc: "Mission return on the dashboard",
    localStorageKey: 'tv-msn-return',
    defaultValue: '1100'
  },
  { 
    type: "input",
    label: "Mission Platform",
    desc: "Mission platform on the dashboard",
    localStorageKey: 'tv-msn-platform',
    defaultValue: 'F-35'
  },
  { 
    type: "input",
    label: "Mission Target",
    desc: "Mission target on the dashboard",
    localStorageKey: 'tv-msn-target',
    defaultValue: 'SAM Sites'
  },
  { 
    type: "button",
    label: "Push Intel Mission Data",
    desc: "Control will send mission data to API Server and write to Data Server",
    handler: handleWriteMsnData
  },
  { 
    type: "button",
    label: "Build ATO",
    desc: "",
    handler: handleBuildATO
  },
  { 
    type: "button",
    label: "Publish ATO",
    desc: "",
    handler: handlePublishATO
  },
]
