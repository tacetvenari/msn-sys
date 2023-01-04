import { HStack, Text } from '@chakra-ui/react'

function ExerciseLabel() {
  return (
      <Text fontWeight="bold" textTransform="uppercase">Exercise</Text>
  )
}

export default function Banner(){
  return (
    <HStack spacing={8} p={1} justify="center" bg="blue.500">
      <ExerciseLabel />
      <ExerciseLabel />
      <ExerciseLabel />
    </HStack>
  )
}
