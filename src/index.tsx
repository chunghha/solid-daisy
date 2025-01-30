/* @refresh reload */
import '@fontsource/fira-mono/index.css'
import '@fontsource/space-grotesk/index.css'
import '@fontsource/montagu-slab/index.css'
import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import App from './App'
import Nav from './components/Nav'
import './index.css'
import About from './pages/About'
import Countries from './pages/Countries'
import { theme } from './stores/theme.store'

render(
  () => (
    <div data-theme={theme.isDark ? 'dark' : 'light'}>
      <div class="bg-linear-45 from-base-200 via-nuetral to-base-100">
        <div class="mx-auto max-w-8xl pt-4 pr-8 pb-8 pl-8">
          <Nav />
          <Router>
            <Route path="/" component={App} />
            <Route path="/about" component={About} />
            <Route path="/country" component={Countries} />
          </Router>
        </div>
      </div>
    </div>
  ),
  document.getElementById('root') as HTMLElement,
)
