import type { CreateQueryOptions } from '@tanstack/solid-query'
import type { Country } from '../models/country'

/**
 * Country Service
 *
 * Extracted from Countries page for better testability.
 * Separates data fetching concerns from UI rendering.
 */

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,capital,population')
  return response.json()
}

export function createCountryQueryOptions(): CreateQueryOptions<Country[], Error> {
  return {
    queryKey: ['countryAPI'],
    queryFn: fetchCountries,
    retry: import.meta?.vitest ? 0 : 1,
  }
}
