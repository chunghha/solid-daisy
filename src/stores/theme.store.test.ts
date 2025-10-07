import { beforeEach, describe, expect, it } from 'vitest'
import { setTheme, theme, toggleTheme } from './theme.store'

describe('theme store', () => {
  beforeEach(() => {
    // Deterministic baseline (light)
    setTheme('isDark', false)
  })

  it('shouldDefaultToLightTheme', () => {
    expect(theme.isDark).toBe(false)
  })

  it('shouldToggleTheme', () => {
    expect(theme.isDark).toBe(false)
    toggleTheme()
    expect(theme.isDark).toBe(true)
    toggleTheme()
    expect(theme.isDark).toBe(false)
  })
})
