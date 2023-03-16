
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
    label: "Build ATO",
    desc: "MSN API Server will build the ATO",
    handler: handleBuildATO
  },
  { 
    label: "Publish ATO",
    desc: "MSN API Server will publish the ATO to the MSN Dashboard",
    handler: handlePublishATO
  },
  { 
    label: "Restore ATO Data",
    desc: "MSN Data Servers will overwrite MSN Data with backup data",
    handler: handleRestoreMsnData
  },
]
