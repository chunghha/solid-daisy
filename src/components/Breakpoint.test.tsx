import { render, screen } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Breakpoint from './Breakpoint'

/**
 * We mock createBreakpoints so we can deterministically drive the reactive
 * state without relying on real matchMedia queries.
 */
let mockMatches = { sm: true, lg: false, xl: false }

vi.mock('@solid-primitives/media', () => ({
  createBreakpoints: () => mockMatches,
}))

function activeButtons() {
  return screen.getAllByRole('button').filter((b) => b.classList.contains('btn-secondary'))
}

describe('Breakpoint component', () => {
  beforeEach(() => {
    // Default baseline (small only)
    mockMatches = { sm: true, lg: false, xl: false }
  })

  it('shouldRenderThreeButtons', () => {
    render(() => <Breakpoint />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    expect(screen.getByRole('button', { name: 'sm' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'lg' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'xl' })).toBeTruthy()
  })

  it('shouldHighlightSmOnlyForSmallBreakpoint', () => {
    mockMatches = { sm: true, lg: false, xl: false }
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('sm')
  })

  it('shouldHighlightLgOnlyForLargeBreakpoint', () => {
    mockMatches = { sm: true, lg: true, xl: false }
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('lg')
  })

  it('shouldHighlightXlOnlyForXlBreakpoint', () => {
    mockMatches = { sm: true, lg: true, xl: true }
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('xl')
  })
})
