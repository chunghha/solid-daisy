/* @refresh reload */
import '@fontsource/fira-mono/index.css'
import '@fontsource/inter/index.css'
import '@fontsource/poppins/index.css'
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
    <div data-theme={theme.isDark ? 'rosepine' : 'dawn'}>
      <div class="bg-gradient-to-r from-base-100 to-neutral">
        <div class="max-w-8xl mx-auto pt-4 pr-8 pb-8 pl-8">
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
