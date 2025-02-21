import type { Component } from 'solid-js'
import Counter from './Counter'

const Hero: Component = () => {
  return (
    <div class="hero min-h-screen bg-base-100">
      <div classNae="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 font-bold font-montagu-slab text-5xl">Hello there</h1>
          <p class="mb-5 font-space-grotesk">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <button type="button" class="btn btn-primary">
            Get Started
          </button>
          <Counter />
        </div>
      </div>
    </div>
  )
}

export default Hero
