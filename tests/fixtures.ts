/**
 * Test fixtures for country-related tests
 *
 * Provides a typed `MockCountry` shape plus factories and a small
 * set of example fixtures to reuse across tests.
 *
 * Keep this file lightweight and deterministic for fast unit tests.
 */

/**
 * Minimal shape used by UI components in tests.
 * Mirrors the fields used by src/pages/Countries.tsx and services.
 */
export interface MockCountry {
  name: {
    common?: string;
    official: string;
  };
  capital?: string[];
  population: number;
  area?: number;
  continents: string[];
  region?: string;
  subregion?: string;
  cca3?: string;
  languages?: Record<string, string>;
  flags: {
    svg: string;
    alt?: string;
  };
}

/**
 * createMockCountry
 *
 * Create a mock country with sensible defaults. You can override any
 * part of the resulting object by passing a partial shape.
 */
export function createMockCountry(overrides?: Partial<MockCountry>): MockCountry {
  const defaultCountry: MockCountry = {
    name: { common: 'Test', official: 'Republic of Test' },
    capital: ['Testville'],
    population: 123_456,
    area: 1234,
    continents: ['Europe'],
    region: 'Europe',
    subregion: 'Western Europe',
    cca3: 'TST',
    languages: { tst: 'Testish' },
    flags: { svg: 'https://flag.test/test.svg', alt: 'Flag of Test' },
  };

  if (!overrides) return defaultCountry;

  return {
    name: { ...(overrides.name ?? defaultCountry.name) },
    capital: overrides.capital ?? defaultCountry.capital,
    population: overrides.population ?? defaultCountry.population,
    area: overrides.area ?? defaultCountry.area,
    continents: overrides.continents ?? defaultCountry.continents,
    region: overrides.region ?? defaultCountry.region,
    subregion: overrides.subregion ?? defaultCountry.subregion,
    cca3: overrides.cca3 ?? defaultCountry.cca3,
    languages: overrides.languages ?? defaultCountry.languages,
    flags: { ...(overrides.flags ?? defaultCountry.flags) },
  };
}

/**
 * createMockCountries
 *
 * Generate `n` mock countries. An optional factory function can be used
 * to customize each generated item (receives index).
 */
export function createMockCountries(n: number, fn?: (i: number) => Partial<MockCountry>): MockCountry[] {
  return Array.from({ length: n }, (_, i) => createMockCountry(fn ? fn(i) : undefined));
}

/**
 * A small, reusable collection used by existing tests.
 */
export const mockCountries: MockCountry[] = [
  createMockCountry({
    name: { official: 'Republic of Test' },
    capital: ['Testville'],
    population: 123_456,
    continents: ['Europe'],
    flags: { svg: 'https://flag.test/test.svg' },
  }),
  createMockCountry({
    name: { official: 'Test Nation' },
    capital: ['Test City'],
    population: 5_000_000,
    continents: ['Asia'],
    flags: { svg: 'https://example.com/flag.svg' },
  }),
];

export const mockCountry = mockCountries[0];
