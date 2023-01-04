import { HStack } from '@chakra-ui/react'
import AircraftCard from './AircraftCard'

const aircraft = [
  "TV-01",
  "TV-02",
  "TV-05",
  "TV-06",
]

export default function AircraftList(){
  return (
    <HStack px={8}>
      {aircraft.map(item => (
          <AircraftCard key={`${item}-card`} aircraft={item} />
        ))}
    </HStack>
  )
}
