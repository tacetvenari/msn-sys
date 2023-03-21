function handleChangeSortieState(send){
  return function sendValue(value){
    send(value)
  }
}

function handleCompileMission(send){
  send('build')
}

function handlePublishMission(send){
  send('publish')
}

function handleReturnSortie(send){
  send('return')
}

function handleResetMission(send){
  send('reset')
}

function handleRestoreMission(send){
  send('restore')
}

export default [
  { 
    type: "select",
    label: "Sortie State",
    desc: "Set the Aircraft state on the MX Dashboard",
    handler: handleChangeSortieState,
    options: [
      { label: "Ready", value: "sortie-land"},
      { label: "Takeoff", value: "sortie-takeoff"},
      { label: "Cancelled", value: "sortie-canx"}
    ]
  },
  { 
    type: "button",
    label: "Build MX Data",
    desc: "MX API Server will pull the data from the MX Data Servers",
    handler: handleCompileMission
  },
  { 
    type: "button",
    label: "Build Return MX Data",
    desc: "MX API Server will pull the return data from the MX Data Servers",
    handler: handleReturnSortie
  },
  { 
    type: "button",
    label: "Publish MX Data",
    desc: "MX API Server will push the built data to the MX Dashboard",
    handler: handlePublishMission
  },
  { 
    type: "button",
    label: "Reset MX Data",
    desc: "MX API Server will clear the msn data file", 
    handler: handleResetMission
  },
  { 
    type: "button",
    label: "Restore MX Data",
    desc: "MX Data Server will overwrite msn data with backup data", 
    handler: handleRestoreMission
  }
]
