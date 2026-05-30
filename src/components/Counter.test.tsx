import { render, screen } from '@solidjs/testing-library'
import { flush } from 'solid-js'
import { beforeEach, describe, expect, it } from 'vitest'
import { click } from '../../tests/utils/solid-test'
import { resetCounter } from '../stores/counter.store'
import Counter from './Counter'

describe('Counter component', () => {
  beforeEach(() => {
    resetCounter()
    flush()
  })

  it('shouldRenderInitialCount', () => {
    render(() => <Counter />)
    // Assert initial label includes count 0
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
  })

  it('shouldIncreaseCounterOnPlusClick', async () => {
    render(() => <Counter />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    click(incrementBtn)
    expect(screen.getByText(/Counter:\s*1/)).toBeTruthy()
  })

  it('shouldDecreaseCounterOnMinusClick', async () => {
    render(() => <Counter />)
    const decrementBtn = screen.getByRole('button', { name: '-' })
    click(decrementBtn)
    expect(screen.getByText(/Counter:\s*-1/)).toBeTruthy()
  })

  it('shouldIncreaseThenDecreaseBackToZero', async () => {
    render(() => <Counter />)
    const incrementBtn = screen.getByRole('button', { name: '+' })
    const decrementBtn = screen.getByRole('button', { name: '-' })

    click(incrementBtn)
    click(incrementBtn)
    expect(screen.getByText(/Counter:\s*2/)).toBeTruthy()

    click(decrementBtn)
    click(decrementBtn)
    expect(screen.getByText(/Counter:\s*0/)).toBeTruthy()
  })
})
