import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About page', () => {
  it('shouldRenderIntroBreakpointAndVersion', () => {
    render(() => <About />)

    // Intro paragraph from About.tsx
    expect(screen.getByText(/this is a solid demo/i)).toBeTruthy()

    // Breakpoint renders multiple buttons (ensure they exist)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)

    // Version component exposes a version label; assert presence of a 'v' or similar version marker
    expect(screen.getByText(/v/i)).toBeTruthy()
  })
})
