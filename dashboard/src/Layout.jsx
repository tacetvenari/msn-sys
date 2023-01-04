import PropTypes from 'prop-types'
import { Box, VStack } from '@chakra-ui/react'
import Banner from './Banner'
import Header from './Header'

export default function Layout({children}){
  return (
    <VStack h="100vh" w="100vw" align="stretch">
      <Banner />
      <Header />
      <Box h="20vh" flex={1}>
        {children}
      </Box>
      <Banner />
    </VStack>
  )
}

Layout.defaultProps = {
  children: undefined
}

Layout.propTypes = {
  children: PropTypes.node
}
