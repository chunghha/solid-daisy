import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home page', () => {
  it('shouldRenderHeroHeading', () => {
    render(() => <Home />)

    // Hero component exposes a level-1 heading "Hello there"
    expect(screen.getByRole('heading', { level: 1, name: /hello there/i })).toBeTruthy()
  })
})
