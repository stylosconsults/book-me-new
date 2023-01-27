import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { HiOutlineXMark } from 'react-icons/hi2'
import { IoMdCheckmark } from 'react-icons/io'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { connect } from 'react-redux'

import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import SelectWithError from 'components/atoms/Select'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import PaymentForm from 'components/molecules/PaymentForm'
import RoomCard from 'components/molecules/RoomCard'
import Steps from 'components/molecules/Steps'
import SuccessBooking from 'components/molecules/SuccessBooking'
import { bookingAction } from 'redux/actions/bookingAction'
import { getRoomAction } from 'redux/actions/roomAction'
import getBookingSelector from 'redux/selectors/bookingSelector'
import getErrorsSelector from 'redux/selectors/errorSelector'
import { getSingleRoomSelector } from 'redux/selectors/roomSelector'
import { formatDate, getDaysBetweenDates } from 'utils/date'

function Booking({ room, errors, bks, getRoomAction, bookingAction }: any) {
  // const { promiseInProgress } = usePromiseTracker()
  const [current, setCurrent] = useState<number>(3)
  const [paymentToken, setPaymentToken] = useState<boolean>({})
  const [disableSubmit, setdisableSubmit] = useState<boolean>(true)
  const [selectedpaymentMethod, setselectedpaymentMethod] = useState('USE')
  const [amountToPay, setamountToPay] = useState(room?.amount)
  const [validationErrors, setValidationErrors] = useState<
    { name: string; message: string }[]
  >([])

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      getRoomAction(router.query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  useEffect(() => {
    setamountToPay(room?.price)
  }, [room?.price])

  const [inputData, setInputData] = useState<
    { name: string; value: string | number }[]
  >([
    { name: 'checkIn', value: '2023/01/28' },
    { name: 'checkOut', value: '2023/01/31' },
    { name: 'numberOfRooms', value: 1 },
    { name: 'firstName', value: 'Axel' },
    { name: 'lastName', value: 'Herrera' },
    { name: 'email', value: 'lenyru@mailinator.com' },
    { name: 'phone', value: '+1 (289) 324-2712' },
    { name: 'arrivalTime', value: '16:54' },
  ])

  const steps = [
    'Hotel room info',
    'Personal Information',
    'Payment Details',
    'Final',
  ]

  const handleSelectPaymentMethod = (value?: string) => {
    setselectedpaymentMethod(value || '')
    removeError('paymentMethod')
  }

  const paymentMethods = [
    { value: 'visa', label: 'Visa card' },
    { value: 'onsite', label: 'Mastercard' },
    { value: 'bank', label: 'Bank transfer' },
    { value: 'onsite', label: 'Pay onsite (cash)' },
  ]

  const processingBooking = () => {
    bookingAction(
      {
        ...inputData.reduce((acc, { name: key, value }) => {
          acc[key] = value
          return acc
        }, {}),
        room: room?.id,
        amount: amountToPay,
        paymentMethod: selectedpaymentMethod,
        token: paymentToken,
      },
      selectedpaymentMethod === 'onsite'
    )
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
    if (name === 'phone') {
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
      if (getInputValue('checkIn') === '') {
        addOrReplaceError({
          name: 'checkIn',
          message: `This field is required`,
        })
        hasError = true
      }
      // check if checkin date is behind tomorrow
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const checkInDate = new Date(getInputValue('checkIn')!)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 0)
      if (checkInDate < tomorrow) {
        addOrReplaceError({
          name: 'checkIn',
          message: `Check in date must be at least tomorrow`,
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
      if (getInputValue('phone') === '') {
        addOrReplaceError({
          name: 'phone',
          message: `This field is required`,
        })
        hasError = true
      }
    }
    if (current === 2) {
      if (!selectedpaymentMethod) {
        addOrReplaceError({
          name: 'paymentMethod',
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
          {
            name: room?.hotel.name + ' Hotel',
            link: '/hotel/' + room?.hotel.id,
          },
          { name: room?.name + ' Room', link: '/room/' + room?.id },
        ]}
      />
      <div className='mt-10 w-full'>
        <Steps steps={steps} setCurrent={setCurrent} current={current} />
      </div>

      <div
        className={`mt-10 bg-co-search shadow-co-search bg-white border rounded p-10`}
      >
        <div className={`${current !== steps.length - 1 && 'max-w-md'} `}>
          {bks?.bookings && !bks?.loading && !errors ? (
            <SuccessBooking pay={processingBooking} bookings={bks.bookings} />
          ) : (
            <>
              <p className={'font-bold mb-4'}>
                You are booking for{' '}
                <span className='text-co-blue'>{room?.name}</span> in{' '}
                <span className='text-co-blue'>{room?.hotel.name}</span>
              </p>
              {current === 0 && (
                <div className='flex flex-col'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-co-black font-bold text-base'>
                      Properties amenities
                    </p>
                    <ul className='flex max-w-[600px] flex-wrap gap-2'>
                      {room?.facilities.map((amenity: any, index: number) => (
                        <li
                          key={index}
                          className='text-co-black flex items-center gap-1'
                        >
                          <IoMdCheckmark /> {amenity}
                        </li>
                      ))}
                      {room?.facilities.length === 0 && (
                        <li className='flex items-center gap-1 text-red-600'>
                          <HiOutlineXMark /> No Amerities listed
                        </li>
                      )}
                    </ul>
                    {/* <p className='font-bold text-sm'>Breakfast included</p> */}
                  </div>

                  <DatePicker
                    numberOfMonths={2}
                    range
                    value={[
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      new Date(getInputValue('checkIn')!),
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      new Date(getInputValue('checkOut')!),
                    ]}
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
                  <div className='mt-3'>
                    <Input
                      name='numberOfRooms'
                      type='number'
                      label='Number of rooms'
                      value={getInputValue('numberOfRooms')}
                      min='1'
                      error={checkIfInputHasError('numberOfRooms')}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setamountToPay(room?.price * parseFloat(e.target.value))
                        handleInputChange(e.target)
                      }}
                    />
                  </div>
                  <div className='flex items-center gap-2 mt-3'>
                    <p className='text-co-black font-bold text-base'>
                      Amount to pay:
                    </p>
                    <p className='text-co-blue font-bold text-base'>
                      ${amountToPay}
                    </p>
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
                    name='phone'
                    type='text'
                    label='Phone number'
                    value={getInputValue('phone')}
                    error={checkIfInputHasError('phone')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e.target)
                    }
                    placeholder='Phone number'
                  />
                  <div className='flex flex-col gap-2'>
                    <p className='text-co-black font-bold text-base'>
                      Arrival time (optional):
                    </p>
                    <DatePicker
                      disableDayPicker
                      format='HH:mm'
                      onChange={(dateObject: any) => {
                        if (dateObject) {
                          handleInputChange({
                            value: dateObject,
                            name: 'arrivalTime',
                          })
                        }
                      }}
                      plugins={[<TimePicker key={'arrivalTime'} hideSeconds />]}
                      render={
                        <TimeCustomInput
                          checkIfInputHasError={checkIfInputHasError}
                        />
                      }
                    />
                  </div>
                </div>
              )}
              {current === 2 && (
                <div className='flex flex-col gap-4'>
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
                  {
                    <PaymentForm
                      paymentMethod={selectedpaymentMethod}
                      setNextStep={setCurrent}
                      current={current}
                      checkPaymentInfo={token => {
                        setPaymentToken(token)
                      }}
                    />
                  }
                </div>
              )}
              {current === 3 && (
                <>
                  <div className='flex gap-4'>
                    <RoomCard
                      id={'1'}
                      name={room?.name}
                      noAdults={room?.adults}
                      noChildren={room?.children}
                      image={room?.image}
                      price={room?.price}
                      discountedPrice={room?.discountedPrice}
                      refundable={true}
                      bedType={room?.bedType}
                      breakfast={true}
                      roomSize={room?.size}
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
                          value: getInputValue('phone')?.toString(),
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
                          value:
                            selectedpaymentMethod.charAt(0).toUpperCase() +
                            selectedpaymentMethod.slice(1),
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
                          value: room?.amount,
                        },
                      ]}
                    />
                  </div>
                  <p className='text-red-500 text-sm'>{errors}</p>
                </>
              )}
              {current !== 2 && (
                <div className='flex gap-3'>
                  <Button
                    disabled={disableSubmit || bks?.loading}
                    onClick={
                      current === steps.length - 1
                        ? () => processingBooking()
                        : () => {
                            if (!checkAllErrors()) setCurrent(current + 1)
                          }
                    }
                    className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
                  >
                    {current === steps.length - 1 && !bks?.loading ? (
                      <span>Book now</span>
                    ) : bks?.loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Continue</span>
                    )}
                  </Button>
                  {current > 0 && current != steps.length - 1 && (
                    <Button
                      onClick={() => setCurrent(current - 1)}
                      className='mt-5'
                    >
                      Back
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

function RangeCustomInput({ openCalendar, value, checkIfInputHasError }: any) {
  return (
    <>
      <div className='flex gap-2 justify-between'>
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

function TimeCustomInput({ openCalendar, value }: any) {
  return (
    <div className='flex gap-2'>
      <Input
        name='checkIn'
        type='text'
        label='Check-in'
        value={value[0]}
        placeholder='Check-in'
        onFocus={openCalendar}
        readOnly
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  room: getSingleRoomSelector(state),
  bks: getBookingSelector(state),
  errors: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getRoomAction, bookingAction })(
  Booking
)
