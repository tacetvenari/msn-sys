import PropTypes from 'prop-types'
import {
  Text
} from '@chakra-ui/react'

export default function AirTaskingOrderList({msnData}){
  console.log(msnData)

  return (
    <Text>Yo</Text>   
  )
}

AirTaskingOrderList.propTypes = {
  msnData: PropTypes.shape({
    target: PropTypes.string,
    intel: PropTypes.shape({})
  }).isRequired,
}
