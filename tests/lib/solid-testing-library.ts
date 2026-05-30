/**
 * Solid 2-compatible testing utilities.
 * Replaces @solidjs/testing-library@0.8.x until 1.0.0-beta is published to npm.
 * Based on solidjs/solid-testing-library next branch.
 */
import { getQueriesForElement, prettyDOM, type PrettyDOMOptions } from '@testing-library/dom'
import type { Component, JSX } from 'solid-js'
import { createComponent, createRoot, flush, getOwner, runWithOwner, type Owner } from 'solid-js'
import { hydrate as solidHydrate, render as solidRender } from '@solidjs/web'

export * from '@testing-library/dom'

type Ui = () => JSX.Element

interface Ref {
  container?: HTMLElement
  dispose: () => void
}

interface Options {
  container?: HTMLElement
  baseElement?: HTMLElement
  queries?: Record<string, unknown>
  hydrate?: boolean
  wrapper?: Component<{ children: JSX.Element }>
}

interface Result {
  asFragment: () => string
  container: HTMLElement
  baseElement: HTMLElement
  debug: (el?: HTMLElement | HTMLElement[], maxLength?: number, options?: PrettyDOMOptions) => void
  unmount: () => void
  [key: string]: unknown
}

const mountedContainers = new Set<Ref>()

export function render(ui: Ui, options: Options = {}): Result {
  let { container, baseElement = container, queries, hydrate = false, wrapper } = options

  if (!baseElement) {
    baseElement = document.body
  }

  if (!container) {
    container = baseElement.appendChild(document.createElement('div'))
  }

  const wrappedUi: Ui =
    typeof wrapper === 'function'
      ? () =>
          createComponent(wrapper, {
            get children() {
              return createComponent(ui, {})
            },
          })
      : ui

  const dispose = hydrate ? solidHydrate(wrappedUi, container) : solidRender(wrappedUi, container)

  mountedContainers.add({ container, dispose })
  flush()

  const queryHelpers = getQueriesForElement(container, queries)

  return {
    asFragment: () => container?.innerHTML as string,
    container,
    baseElement,
    debug: (el = baseElement, maxLength?: number, debugOptions?: PrettyDOMOptions) =>
      Array.isArray(el)
        ? el.forEach((e) => console.log(prettyDOM(e, maxLength, debugOptions)))
        : console.log(prettyDOM(el, maxLength, debugOptions)),
    unmount: dispose,
    ...queryHelpers,
  } as Result
}

export function renderHook<R, A extends unknown[] = []>(
  hook: (...args: A) => R,
  options: A | { initialProps?: A; wrapper?: (props: { children: unknown }) => unknown } = [] as A,
): { result: R; cleanup: () => void; owner: Owner | null } {
  const initialProps = (Array.isArray(options)
    ? options
    : 'initialProps' in options && options.initialProps
      ? options.initialProps
      : []) as A
  const wrapper = typeof options === 'object' && !Array.isArray(options) ? options.wrapper : undefined

  const container = document.createElement('div')
  document.body.appendChild(container)
  let result: R
  let owner: Owner | null = null

  const Comp = () => {
    flush()
    result = hook(...initialProps)
    owner = getOwner()
    return null
  }

  const wrapped = wrapper
    ? () =>
        createComponent(wrapper, {
          get children() {
            return createComponent(Comp, {})
          },
        })
    : () => createComponent(Comp, {})

  const dispose = solidRender(wrapped, container)
  mountedContainers.add({ container, dispose })
  flush()

  return { result: result!, cleanup: dispose, owner }
}

function cleanupAtContainer(ref: Ref) {
  const { container, dispose } = ref
  if (typeof dispose === 'function') {
    dispose()
  }

  if (container?.parentNode === document.body) {
    document.body.removeChild(container)
  }

  mountedContainers.delete(ref)
}

export function cleanup() {
  mountedContainers.forEach(cleanupAtContainer)
}

export function testEffect<T>(
  testee: (done: (result?: T) => void) => void,
  owner: Owner | null = null,
): Promise<T | undefined> {
  return new Promise((done, fail) => {
    const run = owner ? (fn: () => void) => runWithOwner(owner, fn) : (fn: () => void) => createRoot(fn)

    run(() => {
      try {
        testee((result) => done(result))
      } catch (err) {
        fail(err)
      }
    })
  })
}
