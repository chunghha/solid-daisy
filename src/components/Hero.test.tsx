import { fireEvent, render, screen } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it } from 'vitest'
import { counter, resetCounter } from '../stores/counter.store'
import Hero from './Hero'

/**
 * Hero Component Tests
 *
 * Following AGENTS.md guidelines:
 *  - Behavior-focused assertions
 *  - Clear naming: should<DoSomething>
 *  - Deterministic baseline via store reset
 */

describe('Hero component', () => {
  beforeEach(() => {
    resetCounter()
  })

  it('shouldRenderHeading', () => {
    render(() => <Hero />)
    const heading = screen.getByRole('heading', { level: 1, name: /hello there/i })
    expect(heading).toBeTruthy()
  })

  it('shouldRenderGetStartedButton', () => {
    render(() => <Hero />)
    const btn = screen.getByRole('button', { name: /get started/i })
    expect(btn).toBeTruthy()
  })

  it('shouldDisplayInitialCounterValue', () => {
    render(() => <Hero />)
    // Counter format: "Counter: 0"
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
  })

  it('shouldIncrementCounterOnPlusClick', () => {
    render(() => <Hero />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    fireEvent.click(incrementBtn)
    expect(screen.getByText(/Counter:\s*1/)).toBeTruthy()
    expect(counter.count).toBe(1)
  })

  it('shouldDecrementCounterOnMinusClick', () => {
    render(() => <Hero />)
    const decrementBtn = screen.getByRole('button', { name: '-' })
    fireEvent.click(decrementBtn)
    expect(screen.getByText(/Counter:\s*-1/)).toBeTruthy()
    expect(counter.count).toBe(-1)
  })

  it('shouldIncrementThenDecrementBackToZero', () => {
    render(() => <Hero />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    const decrementBtn = screen.getByRole('button', { name: '-' })

    fireEvent.click(incrementBtn)
    fireEvent.click(incrementBtn)
    expect(screen.getByText(/Counter:\s*2/)).toBeTruthy()
    expect(counter.count).toBe(2)

    fireEvent.click(decrementBtn)
    fireEvent.click(decrementBtn)
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
    expect(counter.count).toBe(0)
  })
})
