import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Button from 'components/atoms/Button'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import PaymentForm from 'components/molecules/PaymentForm'
import RoomCard from 'components/molecules/RoomCard'
import SuccessBooking from 'components/molecules/SuccessBooking'
import { CustomCardData } from 'pages/booking/[id]'
import { getBooking, updateBooking } from 'redux/actions/bookingAction'
import getBookingSelector from 'redux/selectors/bookingSelector'
import getErrorsSelector from 'redux/selectors/errorSelector'

function Payment({ bks, errors, getBooking, updateBooking }: any) {
  const [current, setCurrent] = useState(0)
  const [id, setId] = useState('')
  const [orderId, setorderId] = useState('')
  const [bookings, setbookings] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      getBooking(router.query.id)
      setId(router.query.id?.toString() || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  useEffect(() => {
    if (bks?.bookings?.status && !bks?.loading) {
      setbookings(bks?.bookings)
      setCurrent(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bks?.bookings?.status, bks?.loading])

  return (
    <Container>
      <Breadcrumb
        fullLocation={[
          { name: 'Booking', link: `/booking/` },
          { name: 'Payment', link: '/payment' },
        ]}
      />
      {!bks?.bookings?.status && !bks?.loading ? (
        <div className='flex flex-col gap-2'>
          <p className='text-co-black font-bold text-base mt-5'>
            There is no booking information for you!
          </p>
          <p className='text-co-black text-base mt-5 max-w-md'>
            If you have booked with us and you do not see your information on
            the link provided via your email here consider contacting us visa
            <a href='' className='text-blue-600 ml-1'>
              support@booking.rw
            </a>
          </p>
        </div>
      ) : (
        <>
          {current == 0 ? (
            <SuccessBooking
              pay={() => setCurrent(current + 1)}
              bookings={bks?.bookings}
            />
          ) : current == 1 ? (
            <>
              <div className='flex gap-4'>
                <RoomCard
                  id={'1'}
                  name={bookings?.room?.name}
                  noAdults={bookings?.room?.adults}
                  noChildren={bookings?.room?.children}
                  image={bookings?.room?.image}
                  price={bookings?.room?.price}
                  discountedPrice={bookings?.room?.discountedPrice}
                  refundable={true}
                  bedType={bookings?.room?.bedType}
                  breakfast={true}
                  roomSize={bookings?.room?.size}
                  hideBtn
                />
                <CustomCardData
                  title={'Personal'}
                  pageIndex={1}
                  changeState={(page: number) => setCurrent(page)}
                  columns={[
                    {
                      name: 'First Name',
                      value: bookings?.firstName?.toString(),
                    },
                    {
                      name: 'Last Name',
                      value: bookings?.lastName?.toString(),
                    },
                    {
                      name: 'Email',
                      value: bookings?.email?.toString(),
                    },
                    {
                      name: 'Phone Number',
                      value: bookings?.phone?.toString(),
                    },
                    {
                      name: 'Arrival Time',
                      value: bookings?.arrivalTime?.toString(),
                    },
                  ]}
                />
                <CustomCardData
                  title={'Payment'}
                  pageIndex={2}
                  changeState={(page: number) => setCurrent(page)}
                  columns={[
                    {
                      name: 'Room name',
                      value: bookings?.room.name,
                    },
                    {
                      name: 'Number of room',
                      value: bookings?.amount / bookings?.room.price,
                    },
                    {
                      name: 'Amount To Pay',
                      value: bookings?.amount,
                    },
                  ]}
                />
              </div>
              <p className='text-red-500 text-sm'>{errors}</p>

              <Button
                disabled={bks?.loading}
                onClick={() => setCurrent(current + 1)}
                className='mt-5 bg-co-blue text-white hover:bg-blue-700 border-0'
              >
                {bks?.loading ? 'Loading...' : 'Proceed & Pay'}
              </Button>
            </>
          ) : (
            <div className='max-w-md mt-5'>
              <PaymentForm
                current={current}
                setNextStep={setCurrent}
                amountToPay={bks?.bookings.amount}
              />
            </div>
          )}
        </>
      )}
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  bks: getBookingSelector(state),
  errors: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getBooking, updateBooking })(Payment)
