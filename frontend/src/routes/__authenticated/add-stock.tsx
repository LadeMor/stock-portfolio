import { createFileRoute } from '@tanstack/react-router'
import { AddStock } from '../../components/Stock/AddStock'

export const Route = createFileRoute('/__authenticated/add-stock')({
  component: AddStock,
})
