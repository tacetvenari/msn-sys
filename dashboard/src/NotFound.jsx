import React from 'react'
import {
  Flex,
  Heading,
  Stack
} from '@chakra-ui/react'


export default function NotFound(){
  return (
    <Flex bg="tomato" h="100vh" w="100vw" align="center" justify="center">
      <Stack textAlign="center">
        <Heading>WHY ARE YOU HERE?!</Heading>
        <Heading size="m">You are wrong and should feel bad.</Heading>
      </Stack>
    </Flex>
  )
}

