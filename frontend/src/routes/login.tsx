import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../components/Auth/LoginPage'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

