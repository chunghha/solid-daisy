import { type Component, Show, mergeProps } from 'solid-js'
import type { IFormControl } from 'solid-forms'
import { createFormControl } from 'solid-forms'

export const TextInput: Component<{
  control?: IFormControl<string>
  name?: string
  type?: string
  placeholder?: string
}> = (props) => {
  // here we provide a default form control in case the user doesn't supply one
  props = mergeProps({ control: createFormControl(''), type: 'text' }, props)

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
        placeholder={props.placeholder}
        value={props?.control?.value}
        oninput={(e) => {
          props?.control?.setValue(e.currentTarget.value)
        }}
        onblur={() => props?.control?.markTouched(true)}
        required={props?.control?.isRequired}
        class="my-2 form-input rounded-md border-gray-200 shadow-sm focus:primary focus:ring focus:ring-blue-200 focus:ring-opacity-30 w-full"
      />

      <Show when={props?.control?.isTouched && props.control.errors?.isMissing}>
        <small class="text-secondary">
          {props.placeholder}
          {' '}
          required
        </small>
      </Show>
    </div>
  )
}
