import React, { useState } from 'react'

import { FaAccusoft } from 'react-icons/fa'
import Select from 'react-select'

import Button from 'components/atoms/Button'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import RoomCard from 'components/molecules/RoomCard'
import Steps from 'components/molecules/Steps'

export default function Booking() {
  const [current, setCurrent] = useState<number>(0)
  const [selectedPaymentOption, setselectedPaymentOption] = useState('')
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

      <div className='mt-10 bg-co-search shadow-co-search bg-white border rounded p-10'>
        {current === 0 && (
          <div className='flex flex-col gap-4'>
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
              <Select placeholder={'Select bed option'} options={options} />
            </div>
            <div className='flex gap-2'>
              <p className='text-co-black font-bold text-base'>Check-in</p>
              <p className='text-co-black font-bold text-base'>Check-out</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-black font-bold text-base'>
                Number of rooms
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-co-black font-bold text-base'>
                Amount to pay:{' '}
              </p>
              <p className='text-co-blue font-bold text-base'>$100</p>
            </div>
          </div>
        )}
        {current === 1 && (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-co-black font-bold text-base'>First Name</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-black font-bold text-base'>Last Name</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-black font-bold text-base'>Email</p>
            </div>
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
                onChange={e => handleSelectPaymentOption(e?.value)}
                placeholder={'Payment option'}
                options={paymentOptions}
              />
            </div>
            {selectedPaymentOption === 'visa' ? (
              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>Card Number</p>
              </div>
            ) : selectedPaymentOption === 'mastercard' ? (
              <div className='flex flex-col gap-2'>
                <p className='text-co-black font-bold text-base'>Card Number</p>
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
                  First Name:{' '}
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
                  Card No: <span className='font-bold'>Felix Dusengimana</span>
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
            disabled={!selectedPaymentOption}
            onClick={
              current === steps.length - 1
                ? () => ProcessingBooking()
                : () => setCurrent(current + 1)
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
    </Container>
  )
}
