import { flush } from 'solid-js'
import { beforeEach, describe, expect, it } from 'vitest'
import { setTheme, theme, toggleTheme } from './theme.store'

describe('theme store', () => {
  beforeEach(() => {
    // Deterministic baseline (light)
    setTheme((s) => {
      s.isDark = false
    })
    flush()
  })

  it('shouldDefaultToLightTheme', () => {
    expect(theme.isDark).toBe(false)
  })

  it('shouldToggleTheme', () => {
    expect(theme.isDark).toBe(false)
    toggleTheme()
    flush()
    expect(theme.isDark).toBe(true)
    toggleTheme()
    flush()
    expect(theme.isDark).toBe(false)
  })
})
