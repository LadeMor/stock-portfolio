import { RouterProvider } from "@tanstack/react-router"
import { useAuth } from "../providers/useAuth"
import { router } from "../router"

export function AppRouter() {
  const auth = useAuth()

  if (auth.isLoading) {
    return <span>Checking authentication...</span>
  }

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
    />
  )
}