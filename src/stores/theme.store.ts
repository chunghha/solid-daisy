import { createStore } from 'solid-js/store'

export const [theme, setTheme] = createStore({ isDark: false })

export const toggleTheme = () => {
  setTheme(
    'isDark',
    isDark => !isDark,
  )
}
