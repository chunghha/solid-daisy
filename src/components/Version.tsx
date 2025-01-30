import type { Component } from 'solid-js'

const Version: Component = () => {
  return (
    <div class="font-montagu-slab text-secondary">
      App Version:
      {APP_VERSION}
    </div>
  )
}

export default Version
