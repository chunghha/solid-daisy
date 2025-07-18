import type { Component } from 'solid-js'
import { counter, decreaseCounter, increaseCounter } from '../stores/counter.store'

const Counter: Component = () => {
  const c = counter

  return (
    <div class="m-2 text-center font-montagu-slab text-accent">
      <button
        type="button"
        class="btn btn-secondary btn-circle btn-sm mr-2 text-seconary"
        onClick={() => decreaseCounter(c)}
      >
        -
      </button>
      Counter: {c.count}
      <button
        type="button"
        class="btn btn-secondary btn-circle btn-sm ml-2 text-seconary"
        onClick={() => increaseCounter(c)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
