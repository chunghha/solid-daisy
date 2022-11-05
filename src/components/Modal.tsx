import { createFormControl, createFormGroup } from 'solid-forms'
import type { Component } from 'solid-js'
import { createRenderEffect, onMount } from 'solid-js'
import { requiredValidator } from './forms/form-helper'
import { RadioInput } from './forms/RadioInput'
import { TextInput } from './forms/TextInput'
import { TextInputGroup } from './forms/TextInputGroup'

const Modal: Component = () => {
  const closeModalWindow = () => {
    const toggle: any = document.getElementsByName('toggle')[0]
    toggle.checked = false
    // eslint-disable-next-line no-console
    console.log('achCanceled')
  }

  onMount(async () => {
    const toggle: any = document.getElementsByName('toggle')[0]
    toggle.checked = true
    // eslint-disable-next-line no-console
    console.log('achOpened')
  })

  const toggleAccountImageVisible = () => {
    const accountImage: any = document.getElementById('accountNumberImage')
    accountImage.classList.toggle('hidden')
  }

  const toggleRoutingImageVisible = () => {
    const routingImage: any = document.getElementById('routingNumberImage')
    routingImage.classList.toggle('hidden')
  }

  const group = createFormGroup({
    accountNumber: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    repeatedAccountNumber: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    routingNumber: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    nameOnAccount: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    accountType: createFormControl('Checking', {
      required: true,
    }),
  })

  createRenderEffect(() => {
    // clear errors then no go further
    if (!group.children.areValid) {
      group.setErrors(null)

      return
    }

    const accountNumber = group.value.accountNumber
    const repeatedAccountNumber = group.value.repeatedAccountNumber

    if (accountNumber !== repeatedAccountNumber)
      group.setErrors({ invalidAccount: 'Account Numbers should be matched.' })
    else
      group.setErrors(null)
  })

  const onFormSubmit = () => {
    if (group.isSubmitted || !group.isValid)
      return

    // do stuff...
    const { accountNumber, repeatedAccountNumber, routingNumber, nameOnAccount, accountType } = group.value
    // eslint-disable-next-line no-console
    console.log(`${accountNumber} ${repeatedAccountNumber} ${routingNumber} ${nameOnAccount} ${accountType}`)

    group.markSubmitted(true)

    // close the modal window
    const toggle: any = document.getElementsByName('toggle')[0]
    toggle.checked = false
    // eslint-disable-next-line no-console
    console.log('achSubmitted')
  }

  return (
    <div class="font-inter">
      <input type="checkbox" name="toggle" id="pc-ach-form-modal" class="modal-toggle" />
      <div class="form modal modal-middle">
        <div class="modal-box p-0 bg-primary">
          <div class="pb-4">
            <button class="bg-neutral text-primary hover:bg-primary/[.8] hover:text-white btn btn-sm btn-circle absolute right-3 top-3" onClick={closeModalWindow}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 18 18" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13L13 5M5 5L13 13" />
              </svg>
            </button>
          </div>
          <div class="mt-10 px-2 py-1 bg-neutral flex justify-center">
            <span class="mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
            </span>
            <p class="mt-2 mb-1 text-black text-md">Your data is secured. We are
              <a class="ml-1 link text-primary">PCI Compliant</a>
            </p>
          </div>
          <div class="bg-white p-4">
          <TextInputGroup type="text" control={group.controls.accountNumber} placeholder="Account Number" callback={toggleAccountImageVisible} />
          <div class="hidden" id="accountNumberImage">
            <img src="https://placeimg.com/400/225/arch" alt="accountNumberImage" />
          </div>
          <TextInput type="text" control={group.controls.repeatedAccountNumber} placeholder="Repeat Account Number" />
          <div class="text-secondary text-sm ml-2">{group.errors?.invalidAccount}</div>
          <TextInputGroup type="text" control={group.controls.routingNumber} placeholder="Routing Number" callback={toggleRoutingImageVisible} />
          <div class="hidden" id="routingNumberImage">
            <img src="https://placeimg.com/400/225/arch" alt="routingNumberImage" />
          </div>
          <TextInput type="text" control={group.controls.nameOnAccount} placeholder="Name on Account" />
          <div class="mx-2 my-4 grid grid-flow-col auto-cols-max justify-center">
            <RadioInput type="radio" control={group.controls.accountType} value="Checking" name="form-radio-account-type" />
            <span class="ml-8" />
            <RadioInput type="radio" control={group.controls.accountType} value="Savings" name="form-radio-account-type" />
          </div>
          <div class="font-poppins modal-action w-full">
            <button type="submit" class="btn btn-block text-lg bg-primary hover:bg-primary/[.8] text-white" disabled={!group.isValid} onClick={onFormSubmit}>SUBMIT</button>
          </div>
          <div class="font-poppins modal-action w-full">
            <button class="btn btn-block btn-ghost hover:bg-neutral/[.8] text-lg text-accent" onClick={closeModalWindow}>CANCEL</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
