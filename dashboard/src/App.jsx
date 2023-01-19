import {
  RouterProvider,
  ReactRouter,
} from '@tanstack/react-router'
import routeConfig from './routeConfig'

const router = new ReactRouter({ routeConfig })

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
