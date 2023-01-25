import React, { useEffect, useState, useMemo } from 'react'

import { FaAccusoft } from 'react-icons/fa'
import Select from 'react-select'

import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import RoomCard from 'components/molecules/RoomCard'
import Steps from 'components/molecules/Steps'

export default function Booking() {
  const [current, setCurrent] = useState<number>(1)
  const [disableSubmit, setdisableSubmit] = useState<boolean>(true)
  const [selectedPaymentOption, setselectedPaymentOption] = useState('')
  const [validationErrors, setValidationErrors] = useState<
    { name: string; message: string }[]
  >([])

  const [inputData, setInputData] = useState<
    { name: string; value: string | number }[]
  >([
    { name: 'bedOption', value: '' },
    { name: 'checkIn', value: '' },
    { name: 'checkOut', value: '' },
    { name: 'numberOfRooms', value: 1 },
    { name: 'firstName', value: '' },
    { name: 'lastName', value: '' },
    { name: 'email', value: '' },
    { name: 'phoneNumber', value: '' },
  ])

  const steps = [
    'Hotel room info',
    'Personal Information',
    'Payment Details',
    'Final',
  ]

  const handleSelectPaymentOption = (value?: string) => {
    setselectedPaymentOption(value || '')
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const paymentOptions = [
    { value: 'visa', label: 'Visa card' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'paypal', label: 'Paypal' },
  ]

  const ProcessingBooking = () => {
    return alert('Booking')
  }

  useEffect(() => {
    setValidationErrors([])
    setdisableSubmit(false)
  }, [current])

  const handleInputChange = ({
    value,
    name,
  }: {
    value: string | number
    name: string
  }) => {
    setInputData(prev => {
      const index = prev.findIndex(item => item.name === name)
      if (index !== -1) {
        prev[index].value = value.toString()
      } else {
        prev.push({ name, value: value.toString() })
      }
      return [...prev]
    })

    if (value === '') {
      addOrReplaceError({
        name: name,
        message: `This field is required`,
      })
      return
    }

    if (name === 'bedOption') {
      removeError(name)
    }
    if (name === 'checkIn') {
      removeError(name)
    }
    if (name === 'checkOut') {
      removeError(name)
    }
    if (name === 'numberOfRooms') {
      if (parseInt(value.toString()) <= 0) {
        addOrReplaceError({
          name: name,
          message: `Number of rooms must be greater than 0`,
        })
      } else {
        removeError('numberOfRooms')
      }
    }
    if (name === 'firstName') {
      if (value.toString().length < 3) {
        addOrReplaceError({
          name: name,
          message: `First name must be at least 3 characters`,
        })
      } else {
        removeError(name)
      }
    }
    if (name === 'lastName') {
      if (value.toString().length < 3) {
        addOrReplaceError({
          name: name,
          message: `Last name must be at least 3 characters`,
        })
      } else {
        removeError(name)
      }
    }
    if (name === 'email') {
      if (!value.toString().includes('@')) {
        addOrReplaceError({
          name: name,
          message: `Email must be a valid email`,
        })
      } else {
        removeError(name)
      }
    }
    if (name === 'phoneNumber') {
      if (value.toString().length < 10) {
        addOrReplaceError({
          name: name,
          message: `Phone number must be at least 10 characters`,
        })
      } else {
        removeError(name)
      }
    }
  }

  const checkIfInputHasError = (name: string) => {
    const index = validationErrors.findIndex(item => item.name === name)
    if (index !== -1) {
      return validationErrors[index].message
    }
  }

  const removeError = (name: string) => {
    const index = validationErrors.findIndex(item => item.name === name)
    if (index !== -1) {
      validationErrors.splice(index, 1)
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

  const getInputValue = (name: string) => {
    const index = inputData.findIndex(item => item.name === name)
    if (index !== -1) {
      return inputData[index].value
    }
  }

  // check all error before clicking next
  const checkAllErrors = () => {
    let hasError = false
    if (current === 0) {
      if (getInputValue('bedOption') === '') {
        addOrReplaceError({
          name: 'bedOption',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('checkIn') === '') {
        addOrReplaceError({
          name: 'checkIn',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('checkOut') === '') {
        addOrReplaceError({
          name: 'checkOut',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('numberOfRooms') === '') {
        addOrReplaceError({
          name: 'numberOfRooms',
          message: `This field is required`,
        })
        hasError = true
      }
    }
    if (current === 1) {
      if (getInputValue('firstName') === '') {
        addOrReplaceError({
          name: 'firstName',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('lastName') === '') {
        addOrReplaceError({
          name: 'lastName',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('email') === '') {
        addOrReplaceError({
          name: 'email',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('phoneNumber') === '') {
        addOrReplaceError({
          name: 'phoneNumber',
          message: `This field is required`,
        })
        hasError = true
      }
    }
    if (current === 2) {
      if (getInputValue('cardNumber') === '') {
        addOrReplaceError({
          name: 'cardNumber',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('cardHolderName') === '') {
        addOrReplaceError({
          name: 'cardHolderName',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('cardExpiry') === '') {
        addOrReplaceError({
          name: 'cardExpiry',
          message: `This field is required`,
        })
        hasError = true
      }
      if (getInputValue('cardCvv') === '') {
        addOrReplaceError({
          name: 'cardCvv',
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
    <Container>
      <Breadcrumb
        fullLocation={[
          { name: 'Hotel', link: '/hotel' },
          { name: 'Hotel Name', link: '/hotel/[id]' },
        ]}
      />
      <div className='mt-10 w-full'>
        <Steps steps={steps} setCurrent={setCurrent} current={current} />
      </div>

      <div
        className={`mt-10 bg-co-search shadow-co-search bg-white border rounded p-10`}
      >
        <div className={`${current !== steps.length - 1 && 'max-w-md'} `}>
          {current === 0 && (
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>
                  Properties amenities
                </p>
                <ul className='flex max-w-[600px] flex-wrap gap-2'>
                  <li className='text-co-black flex items-center gap-1'>
                    <FaAccusoft /> Lorem ipsum dolor sit amet
                  </li>
                  <li className='text-co-black flex items-center gap-1'>
                    <FaAccusoft /> Lorem ipsum dolor sit amet
                  </li>
                </ul>
                <p className='font-bold text-sm'>Breakfast included</p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>
                  Choose bed option
                </p>
                <Select
                  id='bedOption'
                  onChange={e =>
                    handleInputChange({
                      value: e?.value || '',
                      name: 'bedOption',
                    })
                  }
                  placeholder={'Select bed option'}
                  options={options}
                />
              </div>
              <div className='flex gap-2'>
                <p className='text-co-black font-bold text-base'>Check-in</p>
                <p className='text-co-black font-bold text-base'>Check-out</p>
              </div>
              <Input
                name='numberOfRooms'
                type='number'
                label='Number of rooms'
                value={getInputValue('numberOfRooms')}
                min='1'
                error={checkIfInputHasError('numberOfRooms')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target)
                }
              />
              <div className='flex items-center gap-2 mt-3'>
                <p className='text-co-black font-bold text-base'>
                  Amount to pay:{' '}
                </p>
                <p className='text-co-blue font-bold text-base'>$100</p>
              </div>
            </div>
          )}
          {current === 1 && (
            <div className='flex flex-col'>
              <Input
                name='firstName'
                type='text'
                label='First Name'
                value={getInputValue('firstName')}
                error={checkIfInputHasError('firstName')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target)
                }
                placeholder='First name'
              />
              <Input
                name='lastName'
                label='Last Name'
                type='text'
                value={getInputValue('lastName')}
                error={checkIfInputHasError('lastName')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target)
                }
                placeholder='Last name'
              />
              <Input
                name='email'
                label='Email'
                type='email'
                value={getInputValue('email')}
                error={checkIfInputHasError('email')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target)
                }
                placeholder='Email'
              />
              <Input
                name='phoneNumber'
                type='text'
                label='Phone number'
                value={getInputValue('phoneNumber')}
                error={checkIfInputHasError('phoneNumber')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target)
                }
                placeholder='Phone number'
              />
              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>
                  Arrival time (optional):
                </p>
              </div>
            </div>
          )}
          {current === 2 && (
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>
                  How Do You Want To Pay.
                </p>
                <Select
                  id='paymentOption'
                  onChange={e => handleSelectPaymentOption(e?.value)}
                  placeholder={'Payment option'}
                  options={paymentOptions}
                />
              </div>
              {selectedPaymentOption === 'visa' ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-co-black font-bold text-base'>
                    Card Number
                  </p>
                </div>
              ) : selectedPaymentOption === 'mastercard' ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-co-black font-bold text-base'>
                    Card Number
                  </p>
                </div>
              ) : selectedPaymentOption === 'paypal' ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-co-black font-bold text-base'>Paypal</p>
                </div>
              ) : null}
            </div>
          )}
          {current === 3 && (
            <div className='flex gap-4'>
              <RoomCard
                id={'1'}
                name={'Millie Bob Brown'}
                noPeople={2}
                price={1}
                refundable={true}
                bedType={'Double big bed'}
                breakfast={true}
                roomSize={2}
                hideBtn
              />
              <div
                className='bg-white flex flex-col justify-between rounded-2xl group mt-5 border p-2 shadow'
                style={{
                  width: 'calc(25% - 10px)',
                }}
              >
                <div className='text-sm mt-2'>
                  <h1 className='font-bold text-lg mb-5'>Personal Info</h1>
                  <p>
                    First Name:
                    <span className='font-bold'>Felix Dusengimana</span>
                  </p>
                  <p>
                    Last Name:{' '}
                    <span className='font-bold'>Felix Dusengimana</span>
                  </p>
                  <p>
                    Email: <span className='font-bold'>Felix Dusengimana</span>
                  </p>
                  <p>
                    Arrival time:{' '}
                    <span className='font-bold'>10/1/2023 44:00</span>
                  </p>
                </div>
                <Button className='py-1 font-medium bg-co-blue text-white border-0 w-full mt-2'>
                  Change personal info
                </Button>
              </div>

              <div
                className='bg-white flex flex-col justify-between rounded-2xl group mt-5 border p-2 shadow'
                style={{
                  width: 'calc(25% - 10px)',
                }}
              >
                <div className='text-sm mt-2'>
                  <h1 className='font-bold text-lg mb-5'>Payment Info</h1>
                  <p>
                    Payment type:{' '}
                    <span className='font-bold capitalize'>
                      {selectedPaymentOption}
                    </span>
                  </p>
                  <p>
                    Card No:{' '}
                    <span className='font-bold'>Felix Dusengimana</span>
                  </p>
                  <p>
                    Email: <span className='font-bold'>Felix Dusengimana</span>
                  </p>
                  <p>
                    Amount to pay:
                    <span className='font-bold'>$400</span>
                  </p>
                </div>
                <Button className='py-1 font-medium bg-co-blue text-white border-0 w-full mt-2'>
                  Change payment info
                </Button>
              </div>
            </div>
          )}
          <div className='flex gap-3'>
            <Button
              disabled={disableSubmit}
              onClick={
                current === steps.length - 1
                  ? () => ProcessingBooking()
                  : () => {
                      if (!checkAllErrors()) setCurrent(current + 1)
                    }
              }
              className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
            >
              {current === steps.length - 1 ? (
                <span>Book now</span>
              ) : (
                <span>Continue</span>
              )}
            </Button>
            {current > 0 && current != steps.length - 1 && (
              <Button onClick={() => setCurrent(current - 1)} className='mt-5'>
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
