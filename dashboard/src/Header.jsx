import PropTypes from 'prop-types'
import {
  Flex,
  Heading,
  HStack,
  Image,
  Stack
} from '@chakra-ui/react'
import ConnectionStatus from './ConnectionStatus'

export default function Header({subtitle, connectionStatus}){
  return (
      <Flex alignItems="center" justifyContent="space-between" px={8} py={4}>
        <Image height={40} src="usafe.svg" alt="U.S. Air Forces in Europe" />
        <Stack alignItems="center">
          <Heading size="4xl">Tacet Venari</Heading>
          <HStack>
            <ConnectionStatus state={connectionStatus} />
            <Heading size="md">{subtitle}</Heading>
          </HStack>
        </Stack>
        <Image height={40} src="afafrica.svg" alt="U.S. Air Forces Africa" />
      </Flex>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  connectionStatus: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
  }).isRequired
}
