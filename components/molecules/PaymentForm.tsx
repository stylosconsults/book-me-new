import React, { useEffect, useState } from 'react'

import Button from 'components/atoms/Button'

import Input from '../atoms/Input'

interface PaymentFormProps {
  paymentMethod: string
  checkPaymentInfo: (token: any) => void
  setNextStep?: any
  current?: number
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function PaymentForm({
  paymentMethod,
  checkPaymentInfo,
  setNextStep,
  current,
}: PaymentFormProps) {
  const [error, setError] = useState('')
  const [loading, setloading] = useState(false)

  const [cardInformations, setcardInformations] = useState({
    cardNumber: '4242424242424242',
    expiryDate: '11/32',
    cvc: '333',
    cardHolderName: 'Felix Dusengimana',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setcardInformations({ ...cardInformations, [name]: value })
    setError('')
  }

  useEffect(() => {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script')
      s.id = 'stripe-script'
      s.type = 'text/javascript'
      s.src = 'https://js.stripe.com/v2/'
      s.onload = () => {
        window['Stripe'].setPublishableKey(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        )
      }
      window.document.body.appendChild(s)
    }
  }, [])

  const onSubmit = async () => {
    setloading(true)
    await sleep(300)
    try {
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
            checkPaymentInfo(response)
            setNextStep(current! + 1)
          } else {
            setError(
              'Error generating your payment data, check your infor and try again'
            )
          }
          setloading(false)
        }
      )
    } catch (error) {
      setError('Unexpected error occured')
      setloading(false)
    }
  }

  return (
    <>
      {paymentMethod ? (
        <>
          {paymentMethod === 'onsite' ? (
            <>
              <h1 className='capitalize font-bold text-co-blue text-lg'>
                {paymentMethod} payment (pay by cash)
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
                {paymentMethod} card payment
              </h1>
              <Input
                name={'cardNumber'}
                type='text'
                label='Card Number'
                value={cardInformations.cardNumber}
                onChange={handleInputChange}
              />
              <div className='flex justify-between'>
                <Input
                  name={'expiryDate'}
                  type='text'
                  label='Expiry date'
                  value={cardInformations.expiryDate}
                  onChange={handleInputChange}
                />
                <Input
                  name={'cvc'}
                  type='text'
                  label='CVC/CVV'
                  value={cardInformations.cvc}
                  onChange={handleInputChange}
                />
              </div>
              <Input
                name={'cardHolderName'}
                type='text'
                label='Cardholder name'
                value={cardInformations.cardHolderName}
                onChange={handleInputChange}
              />
              {error && (
                <p className='text-red-500 text-sm font-bold'>{error}</p>
              )}

              <div className='flex gap-3'>
                <Button
                  disabled={loading}
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
