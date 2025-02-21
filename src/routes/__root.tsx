import { Link, Outlet, createRootRoute } from '@tanstack/solid-router'
import App from '../App'
import Nav from '../components/Nav'
import { theme } from '../stores/theme.store'

export const Route = createRootRoute({
  component: () => (
    <>
      <div data-theme={theme.isDark ? 'dark' : 'light'}>
        <div class="bg-linear-45 from-base-200 via-nuetral to-base-100">
          <div class="mx-auto max-w-8xl pt-4 pr-8 pb-8 pl-8">
            <Nav />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ),
})
