import { type Accessor, createSignal, onSettled } from 'solid-js'

export function createMediaQuery(query: string): Accessor<boolean> {
  const mql = window.matchMedia(query)
  const [matches, setMatches] = createSignal(mql.matches)

  onSettled(() => {
    const handler = () => setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  })

  return matches
}
