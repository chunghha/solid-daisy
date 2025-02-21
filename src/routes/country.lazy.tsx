import { createLazyFileRoute } from '@tanstack/solid-router'
import { ROUTES } from '../enums/routes.enum'
import Countries from '../pages/Countries'

export const Route = createLazyFileRoute(`/${ROUTES.COUNTRY}`)({
  component: Countries,
})
