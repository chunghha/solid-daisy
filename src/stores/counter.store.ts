import { createStore } from 'solid-js'
import type { Count } from '../models/count'

export const [counter, setCounter] = createStore<Count>({ count: 0 })

export function decreaseCounter(c: Count) {
  setCounter((s) => {
    s.count = c.count - 1
  })
}

export function increaseCounter(c: Count) {
  setCounter((s) => {
    s.count = c.count + 1
  })
}

export function resetCounter() {
  setCounter((s) => {
    s.count = 0
  })
}
