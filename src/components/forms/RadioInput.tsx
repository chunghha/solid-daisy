import { type Component, Show, mergeProps } from 'solid-js'
import type { IFormControl } from 'solid-forms'
import { createFormControl } from 'solid-forms'

export const RadioInput: Component<{
  control?: IFormControl<string>
  name?: string
  type?: string
  value?: string
}> = (props) => {
  // here we provide a default form control in case the user doesn't supply one
  props = mergeProps({ control: createFormControl(''), type: 'radio' }, props)

  return (
    <div
      classList={{
        'is-invalid': !!props.control?.errors,
        'is-touched': props.control?.isTouched,
        'is-required': props.control?.isRequired,
      }}
    >
      <input
        name={props.name}
        type={props.type}
        value={props?.control?.value}
        onclick={() => {
          props?.control?.setValue(props.value!)
        }}
        onblur={() => props?.control?.markTouched(true)}
        required={props?.control?.isRequired}
        class="form-radio radio-primary h-6 w-6"
        checked={props.control?.value === props.value}
      />
      <span class="align-top ml-4">{props.value}</span>

      <Show when={props?.control?.isTouched && props.control.errors?.isMissing}>
        <small class="text-secondary">required</small>
      </Show>
    </div>
  )
}
