import type { ValidatorFn } from 'solid-forms'

export const requiredValidator: ValidatorFn = (v: string) =>
  v.length === 0 ? { isMissing: true } : null
