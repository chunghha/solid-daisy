import { fireEvent, render, screen } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it } from 'vitest'
import { resetCounter } from '../stores/counter.store'
import Counter from './Counter'

describe('Counter component', () => {
  beforeEach(() => {
    resetCounter()
  })

  it('shouldRenderInitialCount', () => {
    render(() => <Counter />)
    // Assert initial label includes count 0
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
  })

  it('shouldIncreaseCounterOnPlusClick', async () => {
    render(() => <Counter />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    fireEvent.click(incrementBtn)
    expect(screen.getByText(/Counter:\s*1/)).toBeTruthy()
  })

  it('shouldDecreaseCounterOnMinusClick', async () => {
    render(() => <Counter />)
    const decrementBtn = screen.getByRole('button', { name: '-' })
    fireEvent.click(decrementBtn)
    expect(screen.getByText(/Counter:\s*-1/)).toBeTruthy()
  })

  it('shouldIncreaseThenDecreaseBackToZero', async () => {
    render(() => <Counter />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    const decrementBtn = screen.getByRole('button', { name: '-' })

    fireEvent.click(incrementBtn)
    fireEvent.click(incrementBtn)
    expect(screen.getByText(/Counter:\s*2/)).toBeTruthy()

    fireEvent.click(decrementBtn)
    fireEvent.click(decrementBtn)
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
  })
})
