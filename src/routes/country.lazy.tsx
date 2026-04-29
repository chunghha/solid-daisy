import { createLazyFileRoute } from '@tanstack/solid-router'
import Countries from '../pages/Countries'

export const Route = createLazyFileRoute('/country')({
  component: Countries,
})
