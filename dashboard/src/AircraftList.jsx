import PropTypes from 'prop-types'
import { HStack } from '@chakra-ui/react'
import AircraftCard from './AircraftCard'

export default function AircraftList({aircraft, mxData}){
  const getMxData = (currentAircraft) => mxData.find(item => item.tailnumber === currentAircraft)

  return (
    <HStack px={8}>
      {aircraft.map((item, idx) => {
        const aircraftData = getMxData(item) 

        return (
          <AircraftCard key={`${item}-card`} aircraft={item} data={aircraftData} idx={idx} />
        )})}
    </HStack>
  )
}

AircraftList.propTypes = {
  aircraft: PropTypes.arrayOf(PropTypes.string).isRequired,
  mxData: PropTypes.arrayOf(PropTypes.shape({
    tailNumber: PropTypes.string
  })).isRequired,
}
