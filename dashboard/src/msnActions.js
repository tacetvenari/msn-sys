
function handleBuildATO(send){
  send('build')
}

function handlePublishATO(send){
  send('publish')
}

export default [
  { 
    type: "input",
    label: "Mission ID",
    desc: "Mission ID on the dashboard"
  },
  { 
    type: "input",
    label: "Takeoff Time",
    desc: "Mission takeoff on the dashboard"
  },
  { 
    type: "input",
    label: "Return Time",
    desc: "Mission return on the dashboard"
  },
  { 
    type: "input",
    label: "Mission Platform",
    desc: "Mission platform on the dashboard"
  },
  { 
    type: "input",
    label: "Mission Target",
    desc: "Mission target on the dashboard"
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
