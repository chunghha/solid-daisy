import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shouldRenderHomeHeroHeading', () => {
    render(() => <App />)

    // The Hero component used by Home renders a level-1 heading "Hello there"
    expect(screen.getByRole('heading', { level: 1, name: /hello there/i })).toBeTruthy()
  })
})
