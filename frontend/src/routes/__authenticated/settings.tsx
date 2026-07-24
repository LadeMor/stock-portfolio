import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '../../components/Settings/SettingsPage'

export const Route = createFileRoute('/__authenticated/settings')({
  component: SettingsPage,
})

