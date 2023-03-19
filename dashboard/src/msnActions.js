
function handleBuildATO(send){
  send('build')
}

function handlePublishATO(send){
  send('publish')
}

function handleRestoreMsnData(send){
  send('restore')
}

export default [
  { 
    type: "button",
    label: "Build ATO",
    desc: "MSN API Server will build the ATO",
    handler: handleBuildATO
  },
  { 
    type: "button",
    label: "Publish ATO",
    desc: "MSN API Server will publish the ATO to the MSN Dashboard",
    handler: handlePublishATO
  },
  { 
    type: "button",
    label: "Restore ATO Data",
    desc: "MSN Data Servers will overwrite MSN Data with backup data",
    handler: handleRestoreMsnData
  },
]
