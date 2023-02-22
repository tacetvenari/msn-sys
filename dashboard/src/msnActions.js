
function handleBuildATO(send){
  // Send post fetch to mission server
  send('build')
}

function handlePublishATO(send){
  // Fetch mission server from dashboard
  send('publish')
}

export default [
  { 
    label: "Build ATO",
    desc: "",
    handler: handleBuildATO
  },
  { 
    label: "Publish ATO",
    desc: "",
    handler: handlePublishATO
  },
]
