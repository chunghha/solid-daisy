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
    official: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
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
    name: { official: 'Republic of Test' },
    capital: ['Testville'],
    population: 123_456,
    flags: { svg: 'https://flag.test/test.svg' },
  };

  if (!overrides) return defaultCountry;

  return {
    name: { ...(overrides.name ?? defaultCountry.name) },
    capital: overrides.capital ?? defaultCountry.capital,
    population: overrides.population ?? defaultCountry.population,
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
    flags: { svg: 'https://flag.test/test.svg' },
  }),
  createMockCountry({
    name: { official: 'Test Nation' },
    capital: ['Test City'],
    population: 5_000_000,
    flags: { svg: 'https://example.com/flag.svg' },
  }),
];

export const mockCountry = mockCountries[0];
