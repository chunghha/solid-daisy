import { render } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * Deterministic testing of Watch component.
 *
 * We mock `luxon`'s DateTime so that:
 *  - First DateTime.now() => 05:07
 *  - Second DateTime.now() => 05:08 (after interval tick)
 *
 * This allows us to assert the reactive update driven by the 1s interval.
 *
 * Following AGENTS.md:
 *  - Behavior-focused (what user sees via style values)
 *  - Clear naming: should<DoSomething>
 *  - Deterministic baseline per test
 */

// Provide a global handle to reset the mock's internal call index between tests
declare global {
  var __resetDateTimeMock: () => void
}

/**
 * Mock luxon DateTime before importing component.
 * Define FakeDateTime inside the factory to avoid hoist ordering issues.
 */
vi.mock('luxon', () => {
  let callIndex = 0
  class FakeDateTime {
    private iso: string
    constructor(iso: string) {
      this.iso = iso
    }
    static now(): FakeDateTime {
      const sequence = [new FakeDateTime('2024-01-01T05:07:00.000Z'), new FakeDateTime('2024-01-01T05:08:00.000Z')]
      const value = sequence[callIndex] ?? sequence[sequence.length - 1]
      callIndex += 1
      return value
    }
    toFormat(fmt: string): string {
      const date = new Date(this.iso)
      if (fmt === 'HH') return String(date.getUTCHours()).padStart(2, '0')
      if (fmt === 'mm') return String(date.getUTCMinutes()).padStart(2, '0')
      return ''
    }
  }
  ;(globalThis as unknown as { __resetDateTimeMock: () => void }).__resetDateTimeMock = () => {
    callIndex = 0
  }
  return { DateTime: FakeDateTime }
})

// Now import the component (will use mocked DateTime)
import Watch from './Watch'

describe('Watch component', () => {
  beforeEach(() => {
    // Fresh sequence each test
    globalThis.__resetDateTimeMock()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function getHourAndMinuteSpans(container: HTMLElement) {
    const spans = Array.from(container.querySelectorAll('span'))
    expect(spans).toHaveLength(2)
    return spans
  }

  it('shouldRenderInitialHourAndMinuteFromDateTimeNow', () => {
    const { container } = render(() => <Watch />)
    const [hourSpan, minuteSpan] = getHourAndMinuteSpans(container)

    // Expect first mocked time 05:07
    expect(hourSpan.getAttribute('style')).toContain('05')
    expect(minuteSpan.getAttribute('style')).toContain('07')
  })

  it('shouldUpdateMinuteAfterIntervalTick', () => {
    const { container } = render(() => <Watch />)
    let [hourSpan, minuteSpan] = getHourAndMinuteSpans(container)

    // Initial (first call)
    expect(hourSpan.getAttribute('style')).toContain('05')
    expect(minuteSpan.getAttribute('style')).toContain('07')

    // Advance interval (1 second) -> triggers second DateTime.now()
    vi.advanceTimersByTime(1000)

    // Re-query after reactive update
    ;[hourSpan, minuteSpan] = getHourAndMinuteSpans(container)
    expect(hourSpan.getAttribute('style')).toContain('05') // Hour unchanged in sequence
    expect(minuteSpan.getAttribute('style')).toContain('08') // Minute advanced
  })

  it('shouldRemainAtLastMockedTimeOnFurtherTicks', () => {
    const { container } = render(() => <Watch />)

    // First tick already consumed first value (05:07)
    vi.advanceTimersByTime(1000) // second value (05:08)
    vi.advanceTimersByTime(5000) // further ticks reuse last value (05:08)

    const [, minuteSpan] = getHourAndMinuteSpans(container)
    expect(minuteSpan.getAttribute('style')).toContain('08')
  })
})
