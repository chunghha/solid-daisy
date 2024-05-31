import { QueryClient, QueryClientProvider, createQuery } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import type { Component } from 'solid-js'
import { For, Match, Switch } from 'solid-js'
import { SpinningCircles } from 'solid-spinner'
import type { Country } from '../models/country'

async function fetchCountries() {
  return (await fetch('https://restcountries.com/v3.1/all')).json()
}

const queryClient = new QueryClient()

const CountryContainer: Component = () => {
  const query = createQuery(() => ({
    queryKey: ['countryAPI'],
    queryFn: async () => await fetchCountries(),
    retry: 1,
  }))

  return (
    <Switch>
      <Match when={query.isLoading}>
        <div class="flex h-[85vh] items-center justify-center">
          <SpinningCircles color="teal" />
        </div>
      </Match>
      <Match when={query.isError}>
        <div class="text-error">{`${query.status}: ${query.error}`}</div>
      </Match>
      <Match when={query.isSuccess}>
        <div class="grid grid-cols-1 gap-4 py-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <For each={query.data}>
            {(country: Country) => (
              <div class="card card-compact w-84 bg-base-100 shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <figure>
                  <img src={country.flags.svg} alt={country.name.official} />
                </figure>
                <div class="card-body">
                  <h2 class="card-title font-poppins text-secondary">{country.name.official}</h2>
                  <p class="font-inter text-warning text-xl">{country.capital?.[0] ?? ''}</p>
                  <p class="font-inter text-info text-lg">{country.population.toLocaleString()}</p>
                  <div class="card-actions justify-end">
                    <button type="button" class="btn-neutral btn font-poppins">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Match>
    </Switch>
  )
}

const Countries: Component = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryContainer />
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Countries
