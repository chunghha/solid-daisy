import { Link } from '@tanstack/solid-router'
import type { Component } from 'solid-js'
import Hamburger from './icons/Hamburger'
import ThemeSwitcher from './icons/ThemeSwitcher'
import Watch from './Watch'

const Nav: Component = () => {
  return (
    <nav
      aria-label="Primary"
      class="navbar sticky top-4 z-50 mb-4 border-2 border-base-content/10 bg-base-100/75 shadow-[8px_8px_0_rgba(15,8,75,0.16)] backdrop-blur-xl"
    >
      <div class="navbar-start">
        <div class="dropdown z-[1000]">
          <Hamburger />
          <ul
            tabindex="0"
            class="dropdown-content menu menu-compact mt-3 w-52 rounded-none border-2 border-accent bg-base-100 p-2 font-montagu-slab shadow-[8px_8px_0_#0f084b]"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/country">Country</Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <p class="border-base-content/10 border-x-2 px-5 font-black font-montagu-slab text-accent text-xl tracking-[-0.03em]">
          daisyUI
        </p>
      </div>
      <div class="navbar-end gap-3 font-fira-mono text-info">
        <ThemeSwitcher />
        <Watch />
      </div>
    </nav>
  )
}

export default Nav
