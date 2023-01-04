import {
  Flex,
  Heading,
  Image,
  Stack
} from '@chakra-ui/react'

export default function Header(){
  return (
      <Flex alignItems="center" justifyContent="space-between" px={8} py={4}>
        <Image height={40} src="usafe.svg" alt="U.S. Air Forces in Europe" />
        <Stack alignItems="center">
          <Heading size="4xl">Tacet Venari</Heading>
          <Heading size="xl">F-35 Mission System</Heading>
        </Stack>
        <Image height={40} src="afafrica.svg" alt="U.S. Air Forces Africa" />
      </Flex>
  )
}
