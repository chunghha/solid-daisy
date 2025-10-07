import { render, screen, within } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Nav from './Nav'

// We only need structural rendering of <Link />, so mock it to a bare <a>
vi.mock('@tanstack/solid-router', () => ({
  Link: (props: { to: string; children: Node | Node[] }) => (
    // Preserve href so we can assert it
    <a href={props.to}>{props.children}</a>
  ),
}))

// Mock Watch to avoid setInterval side-effects; keep same DOM contract (two spans)
vi.mock('./Watch', () => ({
  default: () => (
    <div class="countdown mock-watch">
      <span style="--value:05;" />
      <span style="--value:07;" />
    </div>
  ),
}))

// Mock ThemeSwitcher to keep its title-based selector
vi.mock('./icons/ThemeSwitcher', () => ({
  default: () => (
    <button type="button" title="Toggle Theme">
      Theme
    </button>
  ),
}))

// Hamburger already just renders an SVG with a <title>; keep real component behavior
// (No mock needed)

describe('Nav component', () => {
  beforeEach(() => {
    // (No shared mutable state to reset; placeholder for future additions)
  })

  it('shouldRenderBrandTitle', () => {
    render(() => <Nav />)
    expect(screen.getByText(/daisyUI/i)).toBeTruthy()
  })

  it('shouldRenderAllNavigationLinks', () => {
    render(() => <Nav />)

    const [homepage] = screen.getAllByRole('link', { name: /homepage/i })
    const [about] = screen.getAllByRole('link', { name: /about/i })
    const [country] = screen.getAllByRole('link', { name: /country/i })
    expect(screen.getAllByRole('link', { name: /homepage/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /country/i }).length).toBeGreaterThan(0)

    expect(homepage).toHaveProperty('getAttribute')
    expect(homepage.getAttribute('href')).toBe('/')

    expect(about.getAttribute('href')).toBe('/about')
    expect(country.getAttribute('href')).toBe('/country')
  })

  it('shouldRenderHamburgerMenuIcon', () => {
    render(() => <Nav />)
    // SVG contains <title>Hamburger Menu</title>
    const [svgTitle] = screen.getAllByTitle(/hamburger menu/i)
    expect(screen.getAllByTitle(/hamburger menu/i).length).toBeGreaterThan(0)
    expect(svgTitle).toBeTruthy()
  })

  it('shouldRenderThemeToggleButton', () => {
    render(() => <Nav />)
    const [toggle] = screen.getAllByTitle(/toggle theme/i)
    expect(screen.getAllByTitle(/toggle theme/i).length).toBeGreaterThan(0)
    expect(toggle).toBeTruthy()
  })

  it('shouldRenderWatchWithTwoTimeSpans', () => {
    const { container } = render(() => <Nav />)
    const watch = container.querySelector('.countdown')
    expect(watch).toBeTruthy()
    const spans = within(watch as HTMLElement).getAllByText('', { selector: 'span' })
    expect(spans.length).toBe(2)
  })

  it('shouldGroupInteractiveElementsInNavbarRegions', () => {
    render(() => <Nav />)

    // Validate structural sections exist
    const start = document.querySelector('.navbar-start')
    const center = document.querySelector('.navbar-center')
    const end = document.querySelector('.navbar-end')

    expect(start).toBeTruthy()
    expect(center).toBeTruthy()
    expect(end).toBeTruthy()

    // Sanity: brand text resides in center
    expect(within(center as HTMLElement).getByText(/daisyUI/i)).toBeTruthy()
  })
})
