import React, { useEffect, useState } from 'react'

import axios from 'axios'

import SelectWithError from 'components/atoms/Select'

import Button from '../atoms/Button'

interface PaymentFormProps {
  checkPaymentInfo: (token: any) => void
  setNextStep?: any
  current?: number
  amountToPay: number
}

function PaymentForm({
  checkPaymentInfo,
  setNextStep,
  current,
  amountToPay,
}: PaymentFormProps) {
  let Checkout: any
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Checkout = window.Checkout
  }
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedpaymentMethod, setselectedpaymentMethod] = useState('')

  const paymentMethods = [
    { value: 'visa', label: 'Visa card' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'bank', label: 'Bank transfer' },
  ]

  const pay = (sessionId: string, uid: number) => {
    Checkout.configure({
      session: {
        id: `${sessionId}`,
      },
      merchant: '8206000697',
      order: {
        amount: amountToPay,
        currency: 'USD',
        description: `Book`,
        id: uid,
        reference: uid,
      },
      transaction: {
        reference: uid,
      },
      interaction: {
        operation: 'PURCHASE',
        merchant: {
          name: 'GODISCOVER AFRICA LTD',
          address: {
            line1: 'kicukiro',
          },
        },
      },
      callbacks: {
        formSessionUpdate: function (response) {
          console.log('formSessionUpdate', response)
        },
      },
    })
    Checkout.showLightbox()
  }

  const handleSubmit = async () => {
    setisLoading(true)
    setError('')
    const uid = Math.abs(new Date().valueOf())
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/payments/session`, {
        amount: amountToPay,
      })
      .then(res => {
        pay(res.data.sessionId, uid)
      })
      .catch(function (error) {
        console.log(error)
        setError('Something went wrong')
      })
    setisLoading(false)
  }

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
          error={!selectedpaymentMethod ? 'Please select a payment method' : ''}
          onChange={e => setselectedpaymentMethod(e?.value)}
        />
      </div>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

      <div className='flex gap-3'>
        <Button
          disabled={isLoading || !selectedpaymentMethod}
          onClick={handleSubmit}
          className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
        >
          {isLoading ? 'Loading...' : 'Pay now'}
        </Button>
        <Button
          disabled={isLoading}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onClick={() => setNextStep(current! - 1)}
          className='mt-5'
        >
          Back
        </Button>
      </div>
    </>
  )
}

export default PaymentForm
