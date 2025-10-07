import { render, screen } from '@solidjs/testing-library'
import { beforeAll, describe, expect, it, vi } from 'vitest'

/**
 * Version Component Tests
 *
 * Goal: Validate that the component renders the static label and the injected
 * build-time version string (APP_VERSION).
 *
 * Constraints:
 *  - APP_VERSION is a compile-time global in production via Vite define.
 *  - In the test environment we simulate it with vi.stubGlobal before importing the component.
 *
 * Following AGENTS.md guidelines:
 *  - Behavior-focused assertions (what user sees)
 *  - Clear naming: should<DoSomething>
 *  - Deterministic setup (fixed test version string)
 */

const TEST_VERSION = '0.4.0-test'

// Will be assigned after dynamic import (ensures global stub is in place first)
let Version: typeof import('./Version').default

beforeAll(async () => {
  // Provide the global symbol before loading the component module
  vi.stubGlobal('APP_VERSION', TEST_VERSION)
  const mod = await import('./Version')
  Version = mod.default
})

describe('Version component', () => {
  it('shouldRenderVersionLabel', () => {
    render(() => <Version />)
    // Assert the static label portion exists somewhere in the rendered text
    const labelNode = screen.getByText((content) => content.includes('App Version:'))
    expect(labelNode).toBeTruthy()
  })

  it('shouldRenderInjectedAppVersion', () => {
    const { container } = render(() => <Version />)
    // Use getAllByText defensively to ensure only one matching node exists
    const nodes = screen.getAllByText(/App Version:/)
    expect(nodes).toHaveLength(1)
    expect(nodes[0].textContent).toContain(TEST_VERSION)
    // Extra safeguard: confirm no duplicate rendered blocks in raw text
    expect(container.textContent?.match(/App Version:/g)?.length).toBe(1)
  })

  it('shouldNotRenderPlaceholderWhenVersionIsPresent', () => {
    render(() => <Version />)
    // Ensure no accidental placeholder text slipped in
    const placeholder = screen.queryByText(/0\.0\.0|DEV/i)
    expect(placeholder).toBeNull()
  })
})
