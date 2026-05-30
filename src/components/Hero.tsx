import type { Component } from 'solid-js'
import Counter from './Counter'

const Hero: Component = () => {
  return (
    <section
      aria-labelledby="hero-title"
      class="relative isolate min-h-[calc(100vh-7rem)] overflow-hidden bg-base-100 px-4 py-14 text-base-content sm:px-8 lg:px-12"
    >
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(233,78,109,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(50,122,136,0.16),transparent_24%),linear-gradient(135deg,rgba(246,242,225,0.96),rgba(221,217,202,0.52))]" />
      <div class="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(#0f084b_1px,transparent_1px)] [background-size:22px_22px]" />
      <div class="absolute top-28 left-6 hidden h-72 w-1 bg-gradient-to-b from-primary via-secondary to-accent lg:block" />
      <div class="hero-float absolute top-14 left-[46%] -z-10 h-24 w-24 rotate-12 border-2 border-secondary/30 bg-secondary/10" />
      <div class="absolute right-10 bottom-12 -z-10 h-40 w-40 rounded-full border-2 border-primary/30 bg-primary/10 blur-[1px]" />
      <div class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="text-left">
          <p class="mb-5 inline-flex border-2 border-accent bg-warning px-3 py-1 font-bold font-fira-mono text-accent text-xs uppercase tracking-[0.22em] shadow-[5px_5px_0_#0f084b]">
            SolidJS + DaisyUI starter
          </p>
          <h1
            id="hero-title"
            class="max-w-3xl text-balance font-black font-montagu-slab text-5xl text-base-content leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
          >
            Hello there
          </h1>
          <div class="mt-4 h-2 w-32 bg-primary shadow-[6px_6px_0_#0f084b]" />
          <p class="mt-7 max-w-2xl font-space-grotesk text-base-content/78 text-lg leading-8 sm:text-xl">
            Build sharp, themed interfaces with Solid's fine-grained reactivity, DaisyUI primitives, and a compact
            TypeScript toolchain that stays fast from prototype to production.
          </p>
          <div class="mt-5 flex flex-wrap gap-2 font-fira-mono text-[0.7rem] uppercase tracking-[0.16em]">
            <span class="border border-base-content/20 bg-base-100/70 px-3 py-1">Vite fast</span>
            <span class="border border-base-content/20 bg-base-100/70 px-3 py-1">TDD ready</span>
            <span class="border border-base-content/20 bg-base-100/70 px-3 py-1">Themeable</span>
          </div>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              class="btn btn-primary btn-lg shadow-[7px_7px_0_#0f084b] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              Get Started
            </button>
            <div class="rounded-full border-2 border-base-content/20 bg-base-100/70 px-4 py-2 backdrop-blur">
              <Counter />
            </div>
          </div>
          <dl class="mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-3">
            <div class="group border-2 border-base-content/10 border-l-4 border-l-primary bg-base-100/70 p-4 transition-transform hover:-translate-y-1">
              <dt class="font-black font-montagu-slab text-3xl tracking-[-0.04em]">8ms</dt>
              <dd class="font-fira-mono text-[0.65rem] uppercase tracking-widest opacity-70">reactivity</dd>
            </div>
            <div class="group border-2 border-base-content/10 border-l-4 border-l-secondary bg-base-100/70 p-4 transition-transform hover:-translate-y-1">
              <dt class="font-black font-montagu-slab text-3xl tracking-[-0.04em]">3</dt>
              <dd class="font-fira-mono text-[0.65rem] uppercase tracking-widest opacity-70">routes</dd>
            </div>
            <div class="group border-2 border-base-content/10 border-l-4 border-l-accent bg-base-100/70 p-4 transition-transform hover:-translate-y-1">
              <dt class="font-black font-montagu-slab text-3xl tracking-[-0.04em]">100%</dt>
              <dd class="font-fira-mono text-[0.65rem] uppercase tracking-widest opacity-70">typed</dd>
            </div>
          </dl>
        </div>
        <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div class="absolute -top-8 -right-6 h-28 w-28 border-2 border-accent bg-primary/20" />
          <div class="relative overflow-hidden border-2 border-accent bg-base-100 p-4 shadow-[10px_10px_0_#0f084b] transition-transform duration-300 hover:-translate-y-1 sm:p-5 sm:shadow-[14px_14px_0_#0f084b]">
            <div class="hero-scanline pointer-events-none absolute top-0 left-0 h-full w-1/3" />
            <div class="mb-5 flex items-center justify-between border-base-content/15 border-b-2 pb-4 font-fira-mono text-xs uppercase tracking-[0.18em]">
              <span>theme lab</span>
              <span class="text-secondary">live</span>
            </div>
            <div class="grid gap-4">
              <div class="rounded-none border-2 border-base-content/15 bg-warning p-5">
                <p class="mb-3 inline-block bg-accent px-2 py-1 font-fira-mono text-[0.65rem] text-accent-content uppercase tracking-widest">
                  scaffold
                </p>
                <p class="font-bold font-montagu-slab text-2xl">Route-ready foundation</p>
                <p class="mt-2 text-base-content/70 text-sm leading-6">
                  File-based routing, tested stores, and design tokens already wired.
                </p>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="bg-secondary p-4 text-secondary-content">
                  <p class="font-fira-mono text-xs uppercase tracking-widest">Signal</p>
                  <p class="mt-3 font-black font-montagu-slab text-4xl">01</p>
                  <p class="mt-2 text-xs opacity-75">local first state</p>
                </div>
                <div class="bg-primary p-4 text-primary-content">
                  <p class="font-fira-mono text-xs uppercase tracking-widest">Store</p>
                  <p class="mt-3 font-black font-montagu-slab text-4xl">02</p>
                  <p class="mt-2 text-xs opacity-80">shared when needed</p>
                </div>
              </div>
              <div class="border-2 border-accent border-dashed bg-accent/5 p-4 font-fira-mono text-accent text-sm">
                <span class="mr-2 text-primary">$</span>pnpm check:all
                <div class="mt-3 h-2 w-full bg-base-200">
                  <div class="h-full w-4/5 bg-secondary" />
                </div>
                <p class="mt-2 text-xs uppercase tracking-widest">green UI confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
