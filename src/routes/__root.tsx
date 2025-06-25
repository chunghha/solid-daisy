import { createRootRoute, Outlet } from '@tanstack/solid-router'
import Nav from '../components/Nav'
import { theme } from '../stores/theme.store'

export const Route = createRootRoute({
  component: () => (
    <>
      <div data-theme={theme.isDark ? 'dark' : 'pursuit'}>
        <div class="bg-gradient-to-r from-base-200 via-neutral-100 to-base-100">
          <div class="mx-auto max-w-8xl pt-4 pr-8 pb-8 pl-8">
            <Nav />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ),
})
