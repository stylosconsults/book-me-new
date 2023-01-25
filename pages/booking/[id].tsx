import React, { useEffect, useState, useMemo } from 'react'

import { FaAccusoft } from 'react-icons/fa'
import DatePicker from 'react-multi-date-picker'
import Select from 'react-select'

import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import RoomCard from 'components/molecules/RoomCard'
import Steps from 'components/molecules/Steps'
import { formatDate, getDaysBetweenDates } from 'utils/date'

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
    { value: 'bank', label: 'Bank transfer' },
    { value: 'onsite', label: 'Pay onsite (cash)' },
  ]

  const ProcessingBooking = () => {
    return alert('Booking')
  }

  useEffect(() => {
    setValidationErrors([])
    setdisableSubmit(false)
  }, [current])

  const checkMine = (e: any) => {
    if (e.length > 1) {
      handleInputChange({ value: e[0], name: 'checkIn' })
      handleInputChange({ value: e[1], name: 'checkOut' })
    }
  }

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
    if (name == 'bedOption') {
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
    console.log(validationErrors)
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
            <div className='flex flex-col'>
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
              <DatePicker
                numberOfMonths={2}
                range
                onChange={(dateObject: any) => {
                  if (dateObject[0] && dateObject[1]) {
                    handleInputChange({
                      value: dateObject[0].format(),
                      name: 'checkIn',
                    })
                    handleInputChange({
                      value: dateObject[1].format(),
                      name: 'checkOut',
                    })
                  }
                }}
                render={
                  <RangeCustomInput
                    checkIfInputHasError={checkIfInputHasError}
                  />
                }
              />
              <div className='flex flex-col gap-2 mt-3'>
                <p className='text-co-black font-bold text-base'>
                  Choose bed option
                </p>
                <Select
                  id='bedOption'
                  onChange={e =>
                    handleInputChange({
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      value: e!.value,
                      name: 'bedOption',
                    })
                  }
                  placeholder={'Select bed option'}
                  options={options}
                />
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
              <CustomCardData
                title={'Personal'}
                pageIndex={1}
                changeState={(page: number) => setCurrent(page)}
                columns={[
                  {
                    name: 'First Name',
                    value: getInputValue('firstName')?.toString(),
                  },
                  {
                    name: 'Last Name',
                    value: getInputValue('lastName')?.toString(),
                  },
                  {
                    name: 'Email',
                    value: getInputValue('email')?.toString(),
                  },
                  {
                    name: 'Phone Number',
                    value: getInputValue('phoneNumber')?.toString(),
                  },
                  {
                    name: 'Arrival Time',
                    value: getInputValue('arrivalTime')?.toString(),
                  },
                ]}
              />
              <CustomCardData
                title={'Payment'}
                pageIndex={2}
                changeState={(page: number) => setCurrent(page)}
                columns={[
                  {
                    name: 'Payment Type',
                    value: selectedPaymentOption,
                  },
                  {
                    name: 'Card Number',
                    value: getInputValue('cardNumber')?.toString(),
                  },
                  {
                    name: 'Email',
                    value: getInputValue('email')?.toString(),
                  },
                  {
                    name: 'Amount To Pay',
                    value: '$100',
                  },
                ]}
              />
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

function RangeCustomInput({ openCalendar, value, checkIfInputHasError }: any) {
  return (
    <>
      <div className='flex gap-2'>
        <Input
          name='checkIn'
          type='text'
          label='Check-in'
          error={checkIfInputHasError('checkIn')}
          value={value[0] && formatDate(new Date(value[0]))}
          placeholder='Check-in'
          onFocus={openCalendar}
          readOnly
        />
        <Input
          name='checkOut'
          type='text'
          label='Check-out'
          error={checkIfInputHasError('checkOut')}
          value={value[1] && formatDate(new Date(value[1]))}
          placeholder='Check-out'
          onFocus={openCalendar}
          readOnly
        />
      </div>
      {value[1] && (
        <p className='font-bold text-co-blue text-sm mt-1'>
          {getDaysBetweenDates(new Date(value[0]), new Date(value[1]))} nights
        </p>
      )}
    </>
  )
}

function CustomCardData({
  changeState,
  columns,
  pageIndex,
  title,
}: {
  title: string
  pageIndex: number
  changeState: (page: number) => void
  columns: { name: string; value?: string }[]
}) {
  return (
    <div
      className='bg-white flex flex-col justify-between rounded-2xl group mt-5 border p-2 shadow'
      style={{
        width: 'calc(25% - 10px)',
      }}
    >
      <div className='text-sm mt-2'>
        <h1 className='font-bold text-lg mb-5 capitalize'>{title} Info</h1>
        {columns.map(
          (column, index) =>
            column.value && (
              <p key={index}>
                {column.name}: <span className='font-bold'>{column.value}</span>
              </p>
            )
        )}
      </div>
      <Button
        onClick={() => changeState(pageIndex)}
        className='py-1 font-medium bg-co-blue text-white border-0 w-full mt-2'
      >
        Change personal info
      </Button>
    </div>
  )
}
