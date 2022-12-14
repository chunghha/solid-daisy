import type { Component } from 'solid-js'
import Breakpoint from '../components/Breakpoint'
import Version from '../components/Version'

const About: Component = () => {
  return (
    <div class="min-h-screen">
      <p class="text-inter p-8 text-center">This is a Solid demo that uses the Country API.</p>
      <div class="mt-4">
        <Breakpoint />
      </div>
      <div class="flex items-center justify-center">
        <Version />
      </div>
    </div>
  )
}

export default About
