import { createStore } from 'solid-js'

export const [theme, setTheme] = createStore({ isDark: false })

export function toggleTheme() {
  setTheme((s) => {
    s.isDark = !s.isDark
  })
}
