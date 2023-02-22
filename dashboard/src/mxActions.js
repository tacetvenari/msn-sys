
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

export default [
  { 
    label: "Build MX Data",
    desc: "MX API Server will pull the data from the MX Data Servers",
    handler: handleCompileMission
  },
  { 
    label: "Build Return Data",
    desc: "MX API Server will pull the return data from the MX Data Servers",
    handler: handleReturnSortie
  },
  { 
    label: "Publish Data",
    desc: "MX API Server will push the built data to the MX Dashboard",
    handler: handlePublishMission
  },
  { 
    label: "Reset MX Data",
    desc: "MX API Server will clear the msn data file", 
    handler: handleResetMission
  }
]
