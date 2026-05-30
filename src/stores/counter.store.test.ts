import { flush } from 'solid-js'
import { beforeEach, describe, expect, it } from 'vitest'
import { counter, decreaseCounter, increaseCounter, resetCounter } from './counter.store'

describe('counter store', () => {
  beforeEach(() => {
    resetCounter()
    flush()
  })

  it('shouldDecreaseCounter', () => {
    const c = counter
    expect(c.count).toBe(0)
    decreaseCounter(c)
    flush()
    expect(c.count).toBe(-1)
  })

  it('shouldIncreaseCounter', () => {
    const c = counter
    expect(c.count).toBe(0)
    increaseCounter(c)
    flush()
    expect(c.count).toBe(1)
  })
})
