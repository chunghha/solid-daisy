import { describe, expect, it } from 'vitest'

describe('index entrypoint', () => {
  it('mounts RouterProvider into #root without throwing', async () => {
    // Create a fresh #root element (what Vite/Vue/React apps normally mount to)
    const root = document.createElement('div')
    root.id = 'root'
    // Ensure the container starts empty (index.tsx checks innerHTML)
    root.innerHTML = ''
    document.body.appendChild(root)

    // Dynamically import the entry module. The import should not throw.
    // Using dynamic import so that the test controls the DOM setup before the module runs.
    await import('./index')

    // Allow any synchronous rendering to complete
    await Promise.resolve()

    // Assert that the mount target was at least touched by the renderer.
    // The exact content can vary (router provider, route components), so we only
    // assert that something was rendered into the container.
    expect(root.innerHTML.length).toBeGreaterThan(0)
  })
})
