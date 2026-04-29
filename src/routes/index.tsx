import { createFileRoute } from '@tanstack/solid-router'
import Home from '../pages/Home'

export const Route = createFileRoute('/')({
  component: Home,
})
