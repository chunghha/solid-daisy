import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import type { Component } from 'solid-js'
import { createMemo, createSignal, For, Match, Show, Switch } from 'solid-js'
import type { Country } from '../models/country'
import { createCountryQueryOptions } from '../services/countryService'

// Default query client for production usage
const defaultQueryClient = new QueryClient()

function countryCapitals(country: Country): string[] {
  return Array.isArray(country.capital) ? country.capital : []
}

function countryRegionLabel(country: Country): string {
  return country.subregion ?? country.region ?? country.continents.join(', ')
}

function populationDensity(country: Country): string {
  if (!country.area) return 'N/A'
  return `${Math.round(country.population / country.area).toLocaleString()}/km²`
}

function firstValue(values?: Record<string, string>): string | undefined {
  return Object.values(values ?? {})[0]
}

function countryMapUrl(country: Country): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name.common ?? country.name.official)}`
}

export const CountryContainer: Component = () => {
  const query = createQuery(createCountryQueryOptions)
  const [searchText, setSearchText] = createSignal('')
  const [selectedContinent, setSelectedContinent] = createSignal('All')

  const isLoading = createMemo(() => query.isLoading)
  const isError = createMemo(() => query.isError)
  const isSuccess = createMemo(() => query.isSuccess)
  const errorMessage = createMemo(() => `${query.status}: ${query.error}`)
  const countries = createMemo(() => (Array.isArray(query.data) ? query.data : []))

  const continents = createMemo(() => {
    const values = countries().flatMap((country) => country.continents ?? [])
    return ['All', ...Array.from(new Set(values)).sort()]
  })

  const filteredCountries = createMemo(() => {
    const normalizedSearch = searchText().trim().toLowerCase()
    const continent = selectedContinent()

    return countries().filter((country) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        country.name.official.toLowerCase().includes(normalizedSearch) ||
        countryCapitals(country).some((capital) => capital.toLowerCase().includes(normalizedSearch))
      const matchesContinent = continent === 'All' || country.continents?.includes(continent)

      return matchesSearch && matchesContinent
    })
  })

  return (
    <Switch>
      <Match when={isLoading()}>
        <section class="animate-pulse py-6 sm:py-8" data-test-name="spinning-circles">
          <div class="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,0.45fr)] lg:items-end">
            <div class="border-base-300 border-l-4 pl-6">
              <div class="h-4 w-36 bg-base-300" />
              <div class="mt-4 h-14 max-w-3xl bg-base-300 sm:h-20" />
              <div class="mt-3 h-14 max-w-2xl bg-base-300/70" />
              <div class="mt-5 h-5 max-w-xl bg-base-300/60" />
            </div>

            <div class="border border-base-300 bg-base-100/70 p-5 shadow-base-content/10 shadow-md">
              <div class="flex items-end justify-between gap-4 border-base-300 border-b pb-4">
                <div>
                  <div class="h-3 w-20 bg-base-300" />
                  <div class="mt-2 h-10 w-24 bg-base-300" />
                </div>
                <div class="h-10 w-20 bg-base-300/70" />
              </div>
              <div class="mt-5 h-14 border border-base-300 bg-base-200/60" />
            </div>
          </div>

          <div class="mt-6 flex gap-2 overflow-hidden border-base-300 border-y py-3">
            <For each={[1, 2, 3, 4, 5, 6]}>{() => <div class="h-8 w-28 shrink-0 rounded-full bg-base-300" />}</For>
          </div>

          <div class="mt-6 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <For each={[1, 2, 3, 4, 5, 6, 7, 8]}>
              {() => (
                <article class="overflow-hidden border border-base-300 bg-base-100/75 shadow-base-content/10 shadow-md">
                  <div class="aspect-[16/9] bg-base-300" />
                  <div class="min-h-64 p-5">
                    <div class="flex gap-2">
                      <div class="h-6 w-24 rounded-full bg-base-300" />
                      <div class="h-6 w-14 rounded-full bg-base-300" />
                    </div>
                    <div class="mt-4 h-7 w-4/5 bg-base-300" />
                    <div class="mt-3 h-8 w-2/3 bg-base-300/70" />
                    <div class="mt-6 border-base-300 border-t pt-4">
                      <div class="h-9 w-40 bg-base-300" />
                      <div class="mt-2 h-4 w-32 bg-base-300/70" />
                    </div>
                    <div class="mt-5 grid grid-cols-2 gap-3">
                      <div class="h-16 bg-base-300/70" />
                      <div class="h-16 bg-base-300/70" />
                      <div class="col-span-2 h-16 bg-base-300/70" />
                    </div>
                    <div class="mt-6 flex justify-between">
                      <div class="h-5 w-12 bg-base-300" />
                      <div class="h-12 w-36 rounded-full bg-base-300" />
                    </div>
                  </div>
                </article>
              )}
            </For>
          </div>
        </section>
      </Match>
      <Match when={isError()}>
        <div class="text-error">{errorMessage()}</div>
      </Match>
      <Match when={isSuccess()}>
        <section class="relative overflow-hidden py-6 sm:py-8">
          <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-primary/10 blur-3xl" />

          <div class="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,0.45fr)] lg:items-end">
            <div class="border-primary border-l-4 pl-6">
              <p class="font-semibold font-space-grotesk text-primary text-xs uppercase tracking-[0.45em]">
                Atlas board
              </p>
              <h1 class="mt-3 max-w-4xl font-montagu-slab text-4xl text-base-content leading-[0.95] sm:text-6xl lg:text-7xl">
                Countries, filtered at a glance.
              </h1>
              <p class="mt-5 max-w-2xl text-base-content/70 text-lg leading-relaxed">
                Search by country or capital, then narrow the board by continent without losing the flag-first scan.
              </p>
            </div>

            <div class="border border-base-300 bg-base-100/90 p-5 shadow-base-content/10 shadow-xl backdrop-blur">
              <div class="flex items-end justify-between gap-4 border-base-300 border-b pb-4">
                <div>
                  <p class="text-base-content/50 text-xs uppercase tracking-[0.3em]">Showing</p>
                  <p class="mt-1 font-montagu-slab text-3xl text-secondary tabular-nums">
                    {filteredCountries().length}/{countries().length}
                  </p>
                </div>
                <p class="max-w-32 text-right text-base-content/60 text-sm">live results</p>
              </div>

              <label class="mt-5 flex h-14 items-center gap-3 border border-base-300 bg-base-200/60 px-4 text-base-content transition focus-within:border-primary focus-within:bg-base-100">
                <span class="text-lg text-primary">⌕</span>
                <input
                  type="search"
                  aria-label="Search countries"
                  class="w-full bg-transparent outline-none placeholder:text-base-content/40"
                  placeholder="Country or capital"
                  value={searchText()}
                  onInput={(event) => setSearchText(event.currentTarget.value)}
                />
              </label>
            </div>
          </div>

          <div class="mt-6 flex gap-2 overflow-x-auto border-base-300 border-y py-3 [scrollbar-width:none]">
            <For each={continents()}>
              {(continent) => (
                <button
                  type="button"
                  class={[
                    'btn btn-sm shrink-0 rounded-full border-base-300 px-4 font-space-grotesk normal-case',
                    {
                      'btn-primary shadow-md shadow-primary/20': selectedContinent() === continent,
                      'btn-ghost bg-base-100/55': selectedContinent() !== continent,
                    },
                  ]}
                  onClick={() => setSelectedContinent(continent)}
                >
                  {continent}
                </button>
              )}
            </For>
          </div>

          <div class="mt-6 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <For each={filteredCountries()}>
              {(country: Country) => (
                <article class="group flex h-full flex-col overflow-hidden border border-base-300 bg-base-100 shadow-base-content/10 shadow-md transition duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/20 hover:shadow-xl">
                  <figure class="relative aspect-[1.65] shrink-0 overflow-hidden bg-base-200">
                    <div class="absolute inset-0 bg-gradient-to-t from-base-content/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <img
                      src={country.flags.svg}
                      alt={country.flags.alt ?? country.name.official}
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </figure>
                  <div class="flex min-h-0 flex-1 flex-col justify-between p-5">
                    <div>
                      <div class="flex items-start justify-between gap-3">
                        <p class="inline-flex rounded-full border border-base-300 bg-base-200/70 px-3 py-1 font-space-grotesk text-base-content/60 text-xs">
                          {country.continents[0]}
                        </p>
                        <Show when={country.cca3}>
                          <p class="inline-flex rounded-full bg-secondary px-3 py-1 font-space-grotesk text-secondary-content text-xs">
                            {country.cca3}
                          </p>
                        </Show>
                      </div>

                      <div class="mt-4 min-h-32">
                        <h2 class="line-clamp-2 min-h-12 font-montagu-slab text-secondary text-xl leading-tight">
                          {country.name.official}
                        </h2>
                        <p class="mt-1 line-clamp-1 min-h-5 text-base-content/50 text-sm">
                          {country.name.common && country.name.common !== country.name.official
                            ? country.name.common
                            : ''}
                        </p>
                        <p class="mt-3 text-base-content/45 text-xs uppercase tracking-[0.25em]">Capital</p>
                        <p class="mt-1 line-clamp-2 font-space-grotesk text-2xl text-base-content leading-tight">
                          {countryCapitals(country)[0] ?? ''}
                        </p>
                      </div>

                      <dl class="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-base-300 bg-base-300 text-sm">
                        <div class="col-span-2 bg-base-100 p-3">
                          <dt class="text-[10px] text-base-content/45 uppercase tracking-[0.25em]">Population</dt>
                          <dd class="mt-1 font-space-grotesk text-3xl text-base-content tabular-nums leading-none">
                            {country.population.toLocaleString()}
                          </dd>
                          <dd class="mt-2 text-base-content/55 text-sm">{countryRegionLabel(country)}</dd>
                        </div>
                        <div class="bg-base-100 p-3">
                          <dt class="text-[10px] text-base-content/45 uppercase tracking-[0.25em]">Density</dt>
                          <dd class="mt-1 text-base-content tabular-nums">{populationDensity(country)}</dd>
                        </div>
                        <div class="bg-base-100 p-3">
                          <dt class="text-[10px] text-base-content/45 uppercase tracking-[0.25em]">Language</dt>
                          <dd class="mt-1 truncate text-base-content">{firstValue(country.languages) ?? 'N/A'}</dd>
                        </div>
                        <div class="col-span-2 bg-base-100 p-3">
                          <dt class="text-[10px] text-base-content/45 uppercase tracking-[0.25em]">Area</dt>
                          <dd class="mt-1 truncate text-base-content tabular-nums">
                            {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div class="mt-5 flex shrink-0 items-center justify-between gap-3">
                      <a
                        href={countryMapUrl(country)}
                        target="_blank"
                        rel="noreferrer"
                        class="link-hover text-base-content/60 text-sm"
                      >
                        Map
                      </a>
                      <button
                        type="button"
                        class="btn btn-primary min-w-36 rounded-full shadow-md shadow-primary/25 transition group-hover:translate-x-1"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </For>
          </div>

          <Show when={filteredCountries().length === 0}>
            <div class="mx-auto max-w-xl border border-base-300 bg-base-100 p-8 text-center shadow-md">
              <p class="font-montagu-slab text-2xl text-secondary">No countries found</p>
              <p class="mt-2 text-base-content/70">
                No match for “{searchText() || 'any search'}” in {selectedContinent()}. Try All continents or a
                different term.
              </p>
            </div>
          </Show>
        </section>
      </Match>
    </Switch>
  )
}

interface CountriesProps {
  queryClient?: QueryClient
}

const Countries: Component<CountriesProps> = (props) => {
  const queryClient = props.queryClient ?? defaultQueryClient

  return (
    <QueryClientProvider client={queryClient}>
      <CountryContainer />
      {!import.meta?.vitest && <SolidQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default Countries
