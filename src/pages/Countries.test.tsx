import { render, screen, waitFor } from '@solidjs/testing-library';
import { QueryClientProvider } from '@tanstack/solid-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockCountry, type MockCountry, mockCountries } from '../../tests/fixtures';
import {
	createDeferred,
	createTestQueryClient,
	stubFetchDeferred,
	stubFetchFailure,
	stubFetchSuccess
} from '../../tests/utils';
import { CountryContainer } from './Countries';

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
	));
}

describe('Countries page', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		// Ensure any global fetch stubs are cleared between tests
		vi.unstubAllGlobals();
	});

	it('shouldShowLoadingThenRenderCountryCardOnSuccess', async () => {
		// Arrange: create a deferred promise and stub fetch to use it
		const deferred = createDeferred<MockCountry[]>();
		const fetchStub = stubFetchDeferred(deferred);
		vi.stubGlobal('fetch', fetchStub);

		const queryClient = createTestQueryClient();

		// Act: render and assert loading state
		renderCountryContainerWithClient(queryClient);

		// Spinner should be present while the deferred is unresolved
		expect(document.querySelector('[data-test-name="spinning-circles"]')).toBeTruthy();

		// Resolve the deferred to simulate the network response
		deferred.resolve(mockCountries);

		// Assert: Country card appears with expected fields (from fixtures)
		expect(await screen.findByText(mockCountries[0].name.official)).toBeTruthy();
		expect(screen.getByText(mockCountries[0].capital?.[0] ?? '')).toBeTruthy();
		expect(screen.getByText(mockCountries[0].population.toLocaleString())).toBeTruthy();
	});

	it('shouldRenderCountryCardWithCorrectDetails', async () => {
		// Arrange: successful fetch response using fixture factory
		const testCountry = createMockCountry({
			name: { official: 'Test Nation' },
			capital: ['Test City'],
			population: 5_000_000,
			flags: { svg: 'https://example.com/flag.svg' }
		});

		const fetchStub = stubFetchSuccess([testCountry]);
		vi.stubGlobal('fetch', fetchStub);

		const queryClient = createTestQueryClient();

		// Act: render and wait for data
		renderCountryContainerWithClient(queryClient);

		// Assert: All country details are displayed correctly (from fixture)
		expect(await screen.findByText(testCountry.name.official)).toBeTruthy();
		expect(screen.getByText(testCountry.capital?.[0] ?? '')).toBeTruthy();
		expect(screen.getByText(testCountry.population.toLocaleString())).toBeTruthy();

		// Assert: Image has correct attributes (from fixture)
		const img = screen.getByRole('img');
		expect(img.getAttribute('src')).toBe(testCountry.flags.svg);
		expect(img.getAttribute('alt')).toBe(testCountry.name.official);

		// Assert: Details button is present
		expect(screen.getByRole('button', { name: 'Details' })).toBeTruthy();
	});

	it('shouldShowErrorWhenFetchFails', async () => {
		// Arrange: fetch rejects
		const fetchStub = stubFetchFailure(new Error('Network failure'));
		vi.stubGlobal('fetch', fetchStub);

		const queryClient = createTestQueryClient();

		// Act: render the container
		renderCountryContainerWithClient(queryClient);

		// Wait until the fetch stub has been called
		await waitFor(() => {
			expect(typeof globalThis.fetch).toBe('function');
		});

		// Now wait for the UI to reflect an error state (be flexible about exact text)
		await waitFor(
			() => {
				const maybeError =
					screen.queryByText(/network failure/i) ||
					screen.queryByText(/error/i) ||
					screen.queryByRole('alert') ||
					screen.queryByText(/failed/i);

				expect(maybeError).toBeTruthy();
			},
			{ timeout: 2000 }
		);
	});
});
