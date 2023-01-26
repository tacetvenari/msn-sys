
function handleCompileMission(send){
  // Send post fetch to mission server
  send('build')
}

function handlePublishMission(send){
  // Fetch mission server from dashboard
  send('publish')
}

function handleLaunchSortie(send){
  // Start sortie timers
  send('launch')
}

function handleReturnSortie(send){
  // Start sortie timers
  send('return')
}

function handleCancelSortie(send){
  // Cancel sortie timers
  send('cancel')
}

function handleResetMission(send){
  // Clear mission server data
  send('reset')
}

export default [
  { 
    label: "Compile Mission Data",
    desc: "Mission Server will compile the data from the Data Servers",
    handler: handleCompileMission
  },
  { 
    label: "Publish Mission Data",
    desc: "Dashboard will pull the mission data from the Mission Server",
    handler: handlePublishMission
  },
  { 
    label: "Launch Sortie",
    desc: "Start the sortie timers",
    handler: handleLaunchSortie
  },
  { 
    label: "Return Sortie",
    desc: "Build the return sortie MX data",
    handler: handleReturnSortie
  },
  { 
    label: "Cancel Sortie",
    desc: "Cancel the current sortie", 
    handler: handleCancelSortie
  },
  { 
    label: "Reset Mission Data",
    desc: "Mission data will be reset (empty)", 
    handler: handleResetMission
  }
]
