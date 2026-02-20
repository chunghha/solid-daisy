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

export function createCountryQueryOptions() {
  return {
    queryKey: ['countryAPI'] as const,
    queryFn: fetchCountries,
    retry: import.meta?.vitest ? 0 : 1,
  }
}
