import type { Component } from 'solid-js'
import Watch from './Watch'
import Hamburger from './icons/Hamburger'
import ThemeSwitcher from './icons/ThemeSwitcher'

const Nav: Component = () => {
  return (
    <div class="navbar bg-neutral shadow-lg mb-4">
      <div class="navbar-start">
        <div class="dropdown z-[1000]">
          <Hamburger />
          <ul
            tabindex="0"
            class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 font-poppins shadow"
          >
            <li>
              <a href="/">Homepage</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/country">Country</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <p class="font-poppins text-xl text-primary">daisyUI</p>
      </div>
      <div class="navbar-end">
        <ThemeSwitcher />
        <Watch />
      </div>
    </div>
  )
}

export default Nav
