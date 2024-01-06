import { createBreakpoints } from '@solid-primitives/media'
import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'

const breakpoints = {
  sm: '640px',
  lg: '1024px',
  xl: '1280px',
}

const Breakpoint: Component = () => {
  const matches = createBreakpoints(breakpoints)

  const [sm, setSm] = createSignal(matches.sm && !matches.lg && !matches.xl)
  const [lg, setLg] = createSignal(matches.sm && !matches.lg && !matches.xl)
  const [xl, setXl] = createSignal(matches.sm && !matches.lg && !matches.xl)

  createEffect(() => {
    setSm(matches.sm && !matches.lg && !matches.xl)
    setLg(matches.sm && matches.lg && !matches.xl)
    setXl(matches.sm && matches.lg && matches.xl)
  })

  return (
    <div class="btn-group flex justify-center p-8">
      <button type="button" classList={{ btn: true, 'btn-warning': sm() }}>
        sm
      </button>
      <button type="button" classList={{ btn: true, 'btn-warning': lg() }}>
        lg
      </button>
      <button type="button" classList={{ btn: true, 'btn-warning': xl() }}>
        xl
      </button>
    </div>
  )
}

export default Breakpoint
