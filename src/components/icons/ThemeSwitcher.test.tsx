import { fireEvent, render, screen } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it } from 'vitest'
import { setTheme, theme } from '../../stores/theme.store'
import ThemeSwitcher from './ThemeSwitcher'

/**
 * Tests for ThemeSwitcher component
 *
 * Following project testing guidelines (AGENTS.md):
 * - Behavior-focused
 * - Clear `should<DoSomething>` naming
 * - Deterministic baseline per test
 */
describe('ThemeSwitcher component', () => {
  beforeEach(() => {
    // Deterministic baseline (light mode)
    setTheme('isDark', false)
  })

  it('shouldRenderAButton', () => {
    render(() => <ThemeSwitcher />)
    const btn = screen.getByRole('button', { name: /toggle theme/i })
    expect(btn).toBeTruthy()
  })

  it('shouldToggleThemeOnClick', () => {
    render(() => <ThemeSwitcher />)

    expect(theme.isDark).toBe(false)

    const btn = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(btn)
    expect(theme.isDark).toBe(true)

    fireEvent.click(btn)
    expect(theme.isDark).toBe(false)
  })

  it('shouldNotChangeThemeWithoutInteraction', () => {
    render(() => <ThemeSwitcher />)
    expect(theme.isDark).toBe(false)
  })
})
