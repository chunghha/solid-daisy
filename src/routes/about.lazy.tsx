import { createLazyFileRoute } from '@tanstack/solid-router'
import About from '../pages/About'

export const Route = createLazyFileRoute('/about')({
  component: About,
})
