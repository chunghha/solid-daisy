import { DateTime } from 'luxon'
import type { Component } from 'solid-js'
import { createSignal, onCleanup } from 'solid-js'

const Watch: Component = () => {
  const [watch, setWatch] = createSignal(DateTime.now())
  const interval = setInterval(
    () => setWatch(() => DateTime.now()),
    1000,
  )

  onCleanup(() => clearInterval(interval))

  return (
    <div class="countdown font-fira-mono ml-2 mr-4 text-xl text-secondary">
      <span class="mr-1" style={`--value:${watch().toFormat('HH')};`}></span>
      <span class="mr-1" style={`--value:${watch().toFormat('mm')};`}></span>
    </div>
  )
}

export default Watch
