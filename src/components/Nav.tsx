import { Link } from '@tanstack/solid-router'
import type { Component } from 'solid-js'
import Watch from './Watch'
import Hamburger from './icons/Hamburger'
import ThemeSwitcher from './icons/ThemeSwitcher'

const Nav: Component = () => {
  return (
    <div class="navbar mb-4 bg-base-200 shadow-lg">
      <div class="navbar-start">
        <div class="dropdown z-[1000]">
          <Hamburger />
          <ul
            tabindex="0"
            class="dropdown-content menu menu-compact mt-3 w-52 rounded-box bg-base-100 p-2 font-montagu-slab shadow"
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
        <p class="font-montagu-slab text-primary text-xl">daisyUI</p>
      </div>
      <div class="navbar-end">
        <ThemeSwitcher />
        <Watch />
      </div>
    </div>
  )
}

export default Nav
