import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router'

type RouterContext = {
  auth: {
    user: unknown | null
    isAuthenticated: boolean
    isLoading: boolean
  }
}


export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})