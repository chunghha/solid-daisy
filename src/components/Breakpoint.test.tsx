import { render, screen } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Breakpoint from './Breakpoint'

const mediaMatches: Record<string, boolean> = {
  '(min-width: 640px)': true,
  '(min-width: 1024px)': false,
  '(min-width: 1280px)': false,
}

vi.stubGlobal(
  'matchMedia',
  vi.fn((query: string) => ({
    matches: mediaMatches[query] ?? false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
)

function activeButtons() {
  return screen.getAllByRole('button').filter((b) => b.classList.contains('btn-secondary'))
}

describe('Breakpoint component', () => {
  beforeEach(() => {
    mediaMatches['(min-width: 640px)'] = true
    mediaMatches['(min-width: 1024px)'] = false
    mediaMatches['(min-width: 1280px)'] = false
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
    mediaMatches['(min-width: 640px)'] = true
    mediaMatches['(min-width: 1024px)'] = false
    mediaMatches['(min-width: 1280px)'] = false
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('sm')
  })

  it('shouldHighlightLgOnlyForLargeBreakpoint', () => {
    mediaMatches['(min-width: 640px)'] = true
    mediaMatches['(min-width: 1024px)'] = true
    mediaMatches['(min-width: 1280px)'] = false
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('lg')
  })

  it('shouldHighlightXlOnlyForXlBreakpoint', () => {
    mediaMatches['(min-width: 640px)'] = true
    mediaMatches['(min-width: 1024px)'] = true
    mediaMatches['(min-width: 1280px)'] = true
    render(() => <Breakpoint />)
    const buttons = activeButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent?.trim()).toBe('xl')
  })
})
