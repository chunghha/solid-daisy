import { createLazyFileRoute } from '@tanstack/solid-router'
import { ROUTES } from '../enums/routes.enum'
import About from '../pages/About'

export const Route = createLazyFileRoute(`/${ROUTES.ABOUT}`)({
  component: About,
})
