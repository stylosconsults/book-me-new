/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Spinner from 'components/atoms/Spinner'
import { updateBooking } from 'redux/actions/bookingAction'
import getBookingsSelector from 'redux/selectors/bookingSelector'

function BookingStatus({ bks, updateBooking }: any) {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    if (router.isReady && router.query.bookingID && router.query.status) {
      if (
        router.query.status != 'approved' &&
        router.query.status != 'rejected'
      ) {
        setError(true)
      } else {
        updateBooking(router.query.bookingID.toString(), {
          status: router.query.status,
        })
      }
    }
  }, [router.isReady])
  return (
    <div className='h-screen flex items-center justify-center'>
      {!router.query.bookingID || !router.query.status || error ? (
        <p className='max-w-md'>
          We cannot update booking at this time. If you are admin,{' '}
          <a href='https://admin.bookme.rw' className='text-co-blue'>
            Login Here
          </a>{' '}
          and change status in admin panel.
        </p>
      ) : (
        <>
          {bks?.loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col text-center'>
              <p className='max-w-md'>Action Completed</p>
              <Link href='/' className='text-co-blue hover:underline'>
                Go Back Home
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  bks: getBookingsSelector(state),
})

export default connect(mapStateToProps, { updateBooking })(BookingStatus)
