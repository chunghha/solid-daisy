import { DateTime } from 'luxon'
import type { Component } from 'solid-js'
import { createSignal, onSettled } from 'solid-js'

const Watch: Component = () => {
  const [watch, setWatch] = createSignal(DateTime.now())

  onSettled(() => {
    const interval = setInterval(() => setWatch(() => DateTime.now()), 1000)
    return () => clearInterval(interval)
  })

  return (
    <div class="countdown mr-4 ml-2 font-fira-mono text-secondary text-xl">
      <span class="mr-1" style={`--value:${watch().toFormat('HH')};`} />
      <span class="mr-1" style={`--value:${watch().toFormat('mm')};`} />
    </div>
  )
}

export default Watch
