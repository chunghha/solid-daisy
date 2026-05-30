import type { Country } from '../models/country'

/**
 * Country Service
 *
 * Extracted from Countries page for better testability.
 * Separates data fetching concerns from UI rendering.
 */

const enrichedCountryFields = 'flags,name,capital,population,area,continents,region,subregion,cca3,languages'
const baseCountryFields = 'flags,name,capital,population,continents,region,subregion'

async function fetchCountryFields(fields: string): Promise<Country[]> {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
  const countries = await response.json()

  if (!Array.isArray(countries)) {
    throw new Error('Expected countries API to return an array')
  }

  return countries
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    return await fetchCountryFields(enrichedCountryFields)
  } catch (_error) {
    return fetchCountryFields(baseCountryFields)
  }
}

export function createCountryQueryOptions() {
  return {
    queryKey: ['countryAPI'] as const,
    queryFn: fetchCountries,
    retry: import.meta?.vitest ? 0 : 1,
  }
}
