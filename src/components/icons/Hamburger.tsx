import type { Component } from 'solid-js'

const Hamburger: Component = () => {
  return (
    <label tabindex="0" class="btn btn-ghost btn-circle" htmlFor="hamberger menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        <title>Hamburger Menu</title>
      </svg>
    </label>
  )
}

export default Hamburger
