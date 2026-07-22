import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { AuthenticatedLayout } from '../../components/AuthenticatedLayout'

export const Route = createFileRoute('/__authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },

  component: AuthenticatedLayout,
})

