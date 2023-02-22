import React from 'react'
import {
  Button,
  Flex,
  Heading,
  Stack
} from '@chakra-ui/react'
import {
  Link
} from '@tanstack/react-router'


export default function Home(){
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Stack>
        <Heading>Available Dashboards</Heading>
        <Button to="mx" as={Link}>Autonomic Logistics Information System</Button>
        <Button to="msn" as={Link}>Theater Battle Management Core System</Button>
      </Stack>
    </Flex>
  )
}

