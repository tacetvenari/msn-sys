function handleCompileMission(){
  // Send post fetch to mission server
  console.log("!")
}

function handlePublishMission(){
  // Fetch mission server from dashboard
  console.log("!")
}

function handleLaunchSortie(){
  // Start sortie timers
  console.log("!")
}

function handleCancelSortie(){
  // Cancel sortie timers
  console.log("!")
}

function handleResetMission(){
  // Clear mission server data
  console.log("!")
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
