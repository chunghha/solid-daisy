import { fireEvent } from '@testing-library/dom'
import { flush } from 'solid-js'

export function click(element: Element) {
  fireEvent.click(element)
  flush()
}
