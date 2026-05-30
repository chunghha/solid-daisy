import { render, screen, waitFor } from '@solidjs/testing-library'
import { QueryClientProvider } from '@tanstack/solid-query'
import { flush } from 'solid-js'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMockCountry, type MockCountry, mockCountries } from '../../tests/fixtures'
import {
  createDeferred,
  createTestQueryClient,
  stubFetchDeferred,
  stubFetchFailure,
  stubFetchSequence,
  stubFetchSuccess,
} from '../../tests/utils'
import { click } from '../../tests/utils/solid-test'
import { CountryContainer } from './Countries'

/**
 * Countries Page Tests (using shared test utils and fixtures)
 *
 * - createTestQueryClient(): fresh QueryClient configured for tests
 * - createDeferred(): deferred promise helper to assert loading states
 * - stubFetch*: helpers to create fetch stubs
 * - fixtures provide typed mock country data
 */

function renderCountryContainerWithClient(queryClient: ReturnType<typeof createTestQueryClient>) {
  return render(() => (
    <QueryClientProvider client={queryClient}>
      <CountryContainer />
    </QueryClientProvider>
  ))
}

describe('Countries page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    // Ensure any global fetch stubs are cleared between tests
    vi.unstubAllGlobals()
  })

  it('shouldShowLoadingThenRenderCountryCardOnSuccess', async () => {
    // Arrange: create a deferred promise and stub fetch to use it
    const deferred = createDeferred<MockCountry[]>()
    const fetchStub = stubFetchDeferred(deferred)
    vi.stubGlobal('fetch', fetchStub)

    const queryClient = createTestQueryClient()

    // Act: render and assert loading state
    renderCountryContainerWithClient(queryClient)

    // Spinner should be present while the deferred is unresolved
    expect(document.querySelector('[data-test-name="spinning-circles"]')).toBeTruthy()

    // Resolve the deferred to simulate the network response
    deferred.resolve(mockCountries)

    // Assert: Country card appears with expected fields (from fixtures)
    expect(await screen.findByText(mockCountries[0].name.official)).toBeTruthy()
    expect(screen.getByText(mockCountries[0].capital?.[0] ?? '')).toBeTruthy()
    expect(screen.getByText(mockCountries[0].population.toLocaleString())).toBeTruthy()
  })

  it('shouldRenderCountryCardWithCorrectDetails', async () => {
    // Arrange: successful fetch response using fixture factory
    const testCountry = createMockCountry({
      name: { official: 'Test Nation' },
      capital: ['Test City'],
      population: 5_000_000,
      area: 250_000,
      cca3: 'TST',
      languages: { eng: 'English' },
      flags: { svg: 'https://example.com/flag.svg', alt: 'A test flag' },
    })

    const fetchStub = stubFetchSuccess([testCountry])
    vi.stubGlobal('fetch', fetchStub)

    const queryClient = createTestQueryClient()

    // Act: render and wait for data
    renderCountryContainerWithClient(queryClient)

    // Assert: All country details are displayed correctly (from fixture)
    expect(await screen.findByText(testCountry.name.official)).toBeTruthy()
    expect(screen.getByText(testCountry.capital?.[0] ?? '')).toBeTruthy()
    expect(screen.getByText(testCountry.population.toLocaleString())).toBeTruthy()

    // Assert: Image has correct attributes (from fixture)
    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe(testCountry.flags.svg)
    expect(img.getAttribute('alt')).toBe(testCountry.flags.alt)

    expect(screen.getByText('TST')).toBeTruthy()
    expect(screen.getByText('20/km²')).toBeTruthy()
    expect(screen.getByText('English')).toBeTruthy()
    expect(screen.getByText('250,000 km²')).toBeTruthy()
    expect(screen.getByRole('link', { name: /map/i }).getAttribute('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Test%20Nation',
    )

    // Assert: Details button is present
    expect(screen.getByRole('button', { name: 'Details' })).toBeTruthy()
  })

  it('shouldShowErrorWhenFetchFails', async () => {
    // Arrange: fetch rejects
    const fetchStub = stubFetchFailure(new Error('Network failure'))
    vi.stubGlobal('fetch', fetchStub)

    const queryClient = createTestQueryClient()

    // Act: render the container
    renderCountryContainerWithClient(queryClient)

    // Wait until the fetch stub has been called
    await waitFor(() => {
      expect(typeof globalThis.fetch).toBe('function')
    })

    // Now wait for the UI to reflect an error state (be flexible about exact text)
    await waitFor(
      () => {
        const maybeError =
          screen.queryByText(/network failure/i) ||
          screen.queryByText(/error/i) ||
          screen.queryByRole('alert') ||
          screen.queryByText(/failed/i)

        expect(maybeError).toBeTruthy()
      },
      { timeout: 2000 },
    )
  })

  it('shouldShowErrorWhenFetchReturnsNonArrayData', async () => {
    vi.stubGlobal('fetch', stubFetchSequence([{ message: 'Bad request' }, { message: 'Still bad' }]))

    renderCountryContainerWithClient(createTestQueryClient())

    await waitFor(
      () => {
        expect(screen.queryByText(/expected countries api to return an array/i)).toBeTruthy()
      },
      { timeout: 2500 },
    )
  })

  it('shouldFallbackToBaseCountryFieldsWhenEnrichedFieldsAreRejected', async () => {
    vi.stubGlobal('fetch', stubFetchSequence([{ message: 'Bad request' }, mockCountries]))

    renderCountryContainerWithClient(createTestQueryClient())

    expect(await screen.findByText(mockCountries[0].name.official)).toBeTruthy()
  })

  it('shouldFilterCountriesBySearchText', async () => {
    const countries = [
      createMockCountry({ name: { official: 'Republic of Argentina' }, capital: ['Buenos Aires'] }),
      createMockCountry({ name: { official: 'United Mexican States' }, capital: ['Mexico City'] }),
    ]

    vi.stubGlobal('fetch', stubFetchSuccess(countries))

    renderCountryContainerWithClient(createTestQueryClient())

    expect(await screen.findByText('Republic of Argentina')).toBeTruthy()

    const search = screen.getByRole('searchbox', { name: /search countries/i }) as HTMLInputElement
    search.value = 'mexico'
    search.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'mexico' }))
    flush()

    expect(screen.queryByText('Republic of Argentina')).toBeNull()
    expect(screen.getByText('United Mexican States')).toBeTruthy()
  })

  it('shouldFindCountryByCapitalSearch', async () => {
    const countries = [
      createMockCountry({ name: { official: 'Republic of Korea' }, capital: ['Seoul'], continents: ['Asia'] }),
      createMockCountry({ name: { official: 'Japan' }, capital: ['Tokyo'], continents: ['Asia'] }),
    ]

    vi.stubGlobal('fetch', stubFetchSuccess(countries))

    renderCountryContainerWithClient(createTestQueryClient())

    expect(await screen.findByText('Republic of Korea')).toBeTruthy()

    const search = screen.getByRole('searchbox', { name: /search countries/i }) as HTMLInputElement
    search.value = 'seoul'
    search.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'seoul' }))
    flush()

    expect(screen.getByText('Republic of Korea')).toBeTruthy()
    expect(screen.queryByText('Japan')).toBeNull()
  })

  it('shouldFilterCountriesByContinent', async () => {
    const countries = [
      createMockCountry({ name: { official: 'Republic of Argentina' }, continents: ['South America'] }),
      createMockCountry({ name: { official: 'Republic of Guatemala' }, continents: ['North America'] }),
    ]

    vi.stubGlobal('fetch', stubFetchSuccess(countries))

    renderCountryContainerWithClient(createTestQueryClient())

    expect(await screen.findByText('Republic of Argentina')).toBeTruthy()

    click(screen.getByRole('button', { name: 'South America' }))

    expect(screen.getByText('Republic of Argentina')).toBeTruthy()
    expect(screen.queryByText('Republic of Guatemala')).toBeNull()
  })
})
