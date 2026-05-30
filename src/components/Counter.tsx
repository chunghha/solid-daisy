import type { Component } from 'solid-js'
import { counter, decreaseCounter, increaseCounter } from '../stores/counter.store'

const Counter: Component = () => {
  const c = counter

  return (
    <div class="flex items-center justify-center gap-3 text-center font-montagu-slab text-accent">
      <button
        type="button"
        class="btn btn-secondary btn-circle btn-sm text-secondary-content shadow-[3px_3px_0_rgba(15,8,75,0.28)] transition-transform hover:-translate-y-0.5"
        onClick={() => decreaseCounter(c)}
      >
        -
      </button>
      <span class="min-w-24 font-bold text-base-content">Counter: {c.count}</span>
      <button
        type="button"
        class="btn btn-secondary btn-circle btn-sm text-secondary-content shadow-[3px_3px_0_rgba(15,8,75,0.28)] transition-transform hover:-translate-y-0.5"
        onClick={() => increaseCounter(c)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
