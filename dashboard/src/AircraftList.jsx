import PropTypes from 'prop-types'
import { HStack } from '@chakra-ui/react'
import AircraftCard from './AircraftCard'

export default function AircraftList({aircraft, mxData, sortieState}){
  
  function getMxData(item, mxData){
    for(var aircraft in Object.keys(Object.keys(mxData))){
      if(mxData[aircraft].tailnumber.toLowerCase() === item){        
        return mxData[aircraft]
      }
    }
  }
  
  return (
    <HStack px={8}>
      {aircraft.map((item, idx) => {
        const aircraftData = getMxData(item, mxData)
        
        return (
          <AircraftCard key={`${item}-card`} aircraft={item} data={aircraftData} idx={idx} sortieState={sortieState} />
        )})}
    </HStack>
  )
}

AircraftList.propTypes = {
  aircraft: PropTypes.arrayOf(PropTypes.string).isRequired,
  mxData: PropTypes.arrayOf(PropTypes.shape({
    tailNumber: PropTypes.string
  })).isRequired,
  sortieState: PropTypes.string.isRequired
}
