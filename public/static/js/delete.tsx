import React, { useEffect, useState } from 'react'

import Button from 'components/atoms/Button'
import SelectWithError from 'components/atoms/Select'

import Input from '../atoms/Input'

interface PaymentFormProps {
  checkPaymentInfo: (token: any) => void
  setNextStep?: any
  current?: number
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function PaymentForm({
  checkPaymentInfo,
  setNextStep,
  current,
}: PaymentFormProps) {
  const [selectedpaymentMethod, setselectedpaymentMethod] = useState('')
  const [loading, setloading] = useState(false)
  const [stripeError, setstripeError] = useState('')
  const [validationErrors, setValidationErrors] = useState<
    {
      message: string
      name: string
    }[]
  >([])
  const [disableSubmit, setdisableSubmit] = useState(false)

  const paymentMethods = [
    { value: 'visa', label: 'Visa card' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'bank', label: 'Bank transfer' },
    { value: 'onsite', label: 'Pay onsite (cash)' },
  ]

  // 4242424242424242
  // 11/32
  // 333

  const [cardInformations, setcardInformations] = useState({
    cardNumber: '4242424242424242',
    expiryDate: '11/32',
    cvc: '333',
    cardHolderName: 'Duuss',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setcardInformations({ ...cardInformations, [name]: value })
    //check inputs
    if (name === 'cardNumber') {
      if (!value) {
        addOrReplaceError({
          name: 'cardNumber',
          message: `This field is required`,
        })
      } else if (value.length < 16) {
        addOrReplaceError({
          name: 'cardNumber',
          message: `Card number must be 16 digits`,
        })
      } else {
        removeError('cardNumber')
      }
    } else if (name === 'expiryDate') {
      if (!value) {
        addOrReplaceError({
          name: 'expiryDate',
          message: `This field is required`,
        })
      } else if (value.split('/').length !== 2) {
        addOrReplaceError({
          name: 'expiryDate',
          message: `Expiry date must be in the format MM/YY`,
        })
      } else {
        removeError('expiryDate')
      }
    } else if (name === 'cvc') {
      if (!value) {
        addOrReplaceError({
          name: 'cvc',
          message: `This field is required`,
        })
      } else if (value.length < 3) {
        addOrReplaceError({
          name: 'cvc',
          message: `CVC must be 3 digits`,
        })
      } else {
        removeError('cvc')
      }
    } else if (name === 'cardHolderName') {
      if (!value) {
        addOrReplaceError({
          name: 'cardHolderName',
          message: `This field is required`,
        })
      } else {
        removeError('cardHolderName')
      }
    }
  }

  const removeError = (name: string) => {
    const index = validationErrors.findIndex(item => item.name === name)
    if (index !== -1) {
      setValidationErrors(prev => {
        prev.splice(index, 1)
        return [...prev]
      })
    }
  }

  const addOrReplaceError = ({
    name,
    message,
  }: {
    name: string
    message: string
  }) => {
    setValidationErrors(prev => {
      const index = prev.findIndex(item => item.name === name)
      if (index !== -1) {
        prev[index].message = message
      } else {
        prev.push({ name: name, message: message })
      }
      return [...prev]
    })
  }

  useEffect(() => {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script')
      s.id = 'stripe-script'
      s.type = 'text/javascript'
      s.src = 'https://js.stripe.com/v2/'
      s.onload = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window['Stripe'].setPublishableKey(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        )
      }
      window.document.body.appendChild(s)
    }
  }, [])

  const onSubmit = async () => {
    if (!checkAllErrors()) {
      setloading(true)
      await sleep(300)
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Stripe.card.createToken(
          {
            number: cardInformations.cardNumber,
            exp_month: cardInformations.expiryDate.split('/')[0],
            exp_year: cardInformations.expiryDate.split('/')[1],
            cvc: cardInformations.cvc,
            name: cardInformations.cardHolderName,
          },
          (status: any, response: any) => {
            if (status === 200) {
              checkPaymentInfo({
                token: response,
                paymentMethod: selectedpaymentMethod,
              })
              setNextStep(current! + 1)
            } else {
              setstripeError(
                'Error generating your payment data, check your information and try again'
              )
            }
            setloading(false)
          }
        )
      } catch (error) {
        console.log(error)
        setstripeError(
          'Unexpected error occured, if error persists refresh and try again!'
        )
        setloading(false)
      }
    }
  }

  const handleSelectPaymentMethod = (value?: string) => {
    setselectedpaymentMethod(value || '')
  }

  function checkIfInputHasError(name: string) {
    const index = validationErrors.findIndex(item => item.name === name)
    if (index !== -1) {
      return validationErrors[index].message
    }
  }

  function checkAllErrors() {
    let hasError = false
    if (!selectedpaymentMethod) {
      addOrReplaceError({
        name: 'paymentMethod',
        message: `This field is required`,
      })
      hasError = true
    }
    if (
      selectedpaymentMethod === 'visa' ||
      selectedpaymentMethod === 'mastercard'
    ) {
      if (!cardInformations.cardNumber) {
        addOrReplaceError({
          name: 'cardNumber',
          message: `This field is required`,
        })
        hasError = true
      }
      if (!cardInformations.expiryDate) {
        addOrReplaceError({
          name: 'expiryDate',
          message: `This field is required`,
        })
        hasError = true
      }
      if (!cardInformations.cvc) {
        addOrReplaceError({
          name: 'cvc',
          message: `This field is required`,
        })
        hasError = true
      }
      if (!cardInformations.cardHolderName) {
        addOrReplaceError({
          name: 'cardHolderName',
          message: `This field is required`,
        })
        hasError = true
      }
    }
    return hasError
  }

  //disable or enable button for next
  useEffect(() => {
    if (validationErrors.length === 0) {
      setdisableSubmit(false)
    } else {
      setdisableSubmit(true)
    }
  }, [validationErrors])

  return (
    <>
      <div className='flex flex-col gap-2'>
        <p className='text-co-black font-bold text-base'>
          How Do You Want To Pay.
        </p>
        <SelectWithError
          name={'paymentMethod'}
          options={paymentMethods}
          placeholder='Select payment option'
          error={checkIfInputHasError('paymentMethod')}
          onChange={e => handleSelectPaymentMethod(e?.value)}
        />
      </div>

      {selectedpaymentMethod ? (
        <>
          {selectedpaymentMethod === 'onsite' ? (
            <>
              <h1 className='capitalize font-bold text-co-blue text-lg'>
                {selectedpaymentMethod} payment (pay by cash)
              </h1>
              When you stay in a hotel, you have the option to pay for your stay
              in cash at the location, this method is called onsite payment.
              Other forms of payment such as credit card, debit card, or
              electronic transfer are also accepted. This type of payment is can
              be through point-of-sale systems or mobile payment apps.
              <div className='flex gap-3'>
                <Button
                  onClick={() => setNextStep(current! + 1)}
                  className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
                >
                  Continue
                </Button>
                <Button
                  disabled={loading}
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onClick={() => setNextStep(current! - 1)}
                  className='mt-5'
                >
                  Back
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className='capitalize font-bold text-co-blue text-lg'>
                {selectedpaymentMethod} card payment
              </h1>
              <Input
                name={'cardNumber'}
                type='text'
                label='Card Number'
                value={cardInformations.cardNumber}
                onChange={handleInputChange}
                error={checkIfInputHasError('cardNumber')}
                placeholder='ex: 4242424242424242'
              />
              <div className='flex justify-between'>
                <Input
                  name={'expiryDate'}
                  type='text'
                  label='Expiry date'
                  value={cardInformations.expiryDate}
                  onChange={handleInputChange}
                  error={checkIfInputHasError('expiryDate')}
                  placeholder='ex: 12/24'
                />
                <Input
                  name={'cvc'}
                  type='text'
                  label='CVC/CVV'
                  value={cardInformations.cvc}
                  onChange={handleInputChange}
                  error={checkIfInputHasError('cvc')}
                  placeholder='ex: 123'
                />
              </div>
              <Input
                name={'cardHolderName'}
                type='text'
                label='Cardholder name'
                value={cardInformations.cardHolderName}
                onChange={handleInputChange}
                error={checkIfInputHasError('cardHolderName')}
                placeholder='ex: John Doe'
              />
              {stripeError && (
                <p className='text-red-500 text-sm font-bold'>{stripeError}</p>
              )}

              <div className='flex gap-3'>
                <Button
                  disabled={loading || disableSubmit}
                  onClick={() => onSubmit()}
                  className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
                >
                  {loading ? 'Loading...' : 'Continue'}
                </Button>
                <Button
                  disabled={loading}
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onClick={() => setNextStep(current! - 1)}
                  className='mt-5'
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  )
}
