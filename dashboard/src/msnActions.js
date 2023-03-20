
function handleBuildATO(send){
  send('build')
}

function handlePublishATO(send){
  send('publish')
}

export default [
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
