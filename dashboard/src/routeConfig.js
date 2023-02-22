import {
  Outlet,
  createRouteConfig
} from '@tanstack/react-router'
import Control from './Control'
import Home from './Home'
import MsnDashboard from './MsnDashboard'
import MxDashboard from './MxDashboard'
import NotFound from './NotFound'

const rootRoute = createRouteConfig({
  component: Outlet
})

const homeRoute = rootRoute.createRoute({
  path: '/',
  component: Home
})

const msnRoute = rootRoute.createRoute({
  path: '/msn',
  component: MsnDashboard
})

const mxRoute = rootRoute.createRoute({
  path: '/mx',
  component: MxDashboard
})


const controlRoute = rootRoute.createRoute({
  path: '/control',
  component: Control
})

const notFoundRoute = rootRoute.createRoute({
  path: '*',
  component: NotFound
})

export default rootRoute.addChildren([
  controlRoute,
  homeRoute,
  msnRoute,
  mxRoute,
  notFoundRoute
])
