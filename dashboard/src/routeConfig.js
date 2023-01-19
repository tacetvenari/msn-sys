import {
  Outlet,
  createRouteConfig
} from '@tanstack/react-router'
import Admin from './Admin'
import Dashboard from './Dashboard'

const rootRoute = createRouteConfig({
  component: Outlet
})

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: Dashboard
})

const adminRoute = rootRoute.createRoute({
  path: '/admin',
  component: Admin
})

export default rootRoute.addChildren([indexRoute, adminRoute])
