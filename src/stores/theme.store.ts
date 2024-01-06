import { createStore } from 'solid-js/store'

export const [theme, setTheme] = createStore({ isDark: false })

export function toggleTheme() {
  setTheme('isDark', (isDark) => !isDark)
}
