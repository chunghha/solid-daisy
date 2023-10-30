import { type Component, Show, mergeProps } from 'solid-js'
import type { IFormControl } from 'solid-forms'
import { createFormControl } from 'solid-forms'

export const TextInputGroup: Component<{
  control?: IFormControl<string>
  name?: string
  type?: string
  placeholder?: string
  callback?: any
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
      <label class="input-group">
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
          class="mt-4 mb-2 form-input rounded-md border-gray-200 shadow-sm focus:primary focus:ring focus:ring-blue-200 focus:ring-opacity-30 w-full"
        />
        <span class="mt-4 mb-2 p-0 border border-gray-200 border-solid">
          <button class="btn btn-square" onClick={props.callback}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z" />
            </svg>
          </button>
        </span>
      </label>

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
