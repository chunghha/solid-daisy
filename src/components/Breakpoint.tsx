import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { createMediaQuery } from '../lib/media-query'

const Breakpoint: Component = () => {
  const sm = createMediaQuery('(min-width: 640px)')
  const lg = createMediaQuery('(min-width: 1024px)')
  const xl = createMediaQuery('(min-width: 1280px)')

  const smActive = createMemo(() => sm() && !lg() && !xl())
  const lgActive = createMemo(() => sm() && lg() && !xl())
  const xlActive = createMemo(() => sm() && lg() && xl())

  return (
    <div class="btn-group flex justify-center p-8">
      <button type="button" class={['btn', { 'btn-secondary': smActive() }]}>
        sm
      </button>
      <button type="button" class={['btn', { 'btn-secondary': lgActive() }]}>
        lg
      </button>
      <button type="button" class={['btn', { 'btn-secondary': xlActive() }]}>
        xl
      </button>
    </div>
  )
}

export default Breakpoint
