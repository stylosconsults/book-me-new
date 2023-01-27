import React, { useEffect } from 'react'

import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import SuccessBooking from 'components/molecules/SuccessBooking'
import { getBooking } from 'redux/actions/bookingAction'
import getBookingSelector from 'redux/selectors/bookingSelector'
import getErrorsSelector from 'redux/selectors/errorSelector'

function Payment({ bks, errors, getBooking }: any) {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      getBooking(router.query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])
  return (
    <Container>
      <Breadcrumb
        fullLocation={[
          { name: 'Booking', link: `/booking/` },
          { name: 'Payment', link: '/payment' },
        ]}
      />
      {!bks?.bookings?.status ? (
        <div className='flex flex-col gap-2'>
          <p className='text-co-black font-bold text-base'>
            You have booked with this information
          </p>
        </div>
      ) : (
        <SuccessBooking
          pay={() => {
            alert('Wait a little bit')
          }}
          bookings={bks?.bookings}
        />
      )}
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  bks: getBookingSelector(state),
  errors: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getBooking })(Payment)
