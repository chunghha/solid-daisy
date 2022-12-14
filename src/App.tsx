import { Route, Routes } from '@solidjs/router'
import type { Component } from 'solid-js'

import Nav from './components/Nav'
import About from './pages/About'
import Ach from './pages/Ach'
import Countries from './pages/Countries'
import Home from './pages/Home'
import { theme } from './stores/theme.store'

const App: Component = () => {
  return (
    <div data-theme={theme.isDark ? 'rosepine' : 'dawn'}>
      <div class="bg-gradient-to-r from-base-100 to-neutral">
        <div class="max-w-8xl mx-auto pt-4 pr-8 pb-8 pl-8">
          <Nav />
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/country" component={Countries} />
            <Route path="/ach" component={Ach} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App
