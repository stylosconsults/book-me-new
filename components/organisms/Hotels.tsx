import React, { Fragment, useEffect } from 'react'

import { usePromiseTracker } from 'react-promise-tracker'
import { connect } from 'react-redux'

import Heading from 'components/atoms/Heading'
import HotelCard from 'components/molecules/HotelCard'
import { getHotelsAction } from 'redux/actions/hotelActions'
import getErrorsSelector from 'redux/selectors/errorSelector'
import getHotelsSelector from 'redux/selectors/hotelSelector'

function Hotels({ hotels, errors, getHotelsAction }: any) {
  const { promiseInProgress } = usePromiseTracker()
  useEffect(() => {
    getHotelsAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='bg-[#F4F5F6] w-full h-fit p-10 py-20 rounded-3xl'>
      <Heading subTitle="Let's go on an adventure">Go somewhere</Heading>
      <div className='flex flex-wrap gap-5'>
        {!promiseInProgress ? (
          <>
            {hotels?.results?.map(
              (
                { images, id, name, city, state, address }: any,
                index: number
              ) => (
                <Fragment key={index}>
                  <HotelCard
                    id={id}
                    image={images[0]}
                    name={name}
                    location={city}
                    state={state}
                    date={address}
                    rating={5}
                  />
                </Fragment>
              )
            )}
            {hotels?.results?.length === 0 || hotels?.results === undefined ? (
              <p className='text-center text-md mt-3 font-bold text-gray-500'>
                Hotels will be loaded soon (come back later)
              </p>
            ) : null}
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  hotels: getHotelsSelector(state),
  errors: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getHotelsAction })(Hotels)
