import React, { Fragment, useEffect, useState } from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Week } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { TiLocationArrowOutline } from 'react-icons/ti'
import { usePromiseTracker } from 'react-promise-tracker'
import { connect } from 'react-redux'

import Container from 'components/Container'
import HotelCard from 'components/molecules/HotelCard'
import SearchTextInput from 'components/molecules/SearchTextInput'
import { getHotelsAction } from 'redux/actions/hotelActions'
import getErrorsSelector from 'redux/selectors/errorSelector'
import getHotelsSelector from 'redux/selectors/hotelSelector'

function SearchHotel({ hotels, error, getHotelsAction }: any) {
  const { promiseInProgress } = usePromiseTracker()
  const [timer, setTimer] = useState<any>(null)

  const [params, setparams] = useState({
    city: '',
    checkin: '',
    checkout: '',
    travelers: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setparams({ ...params, [e.target.name]: e.target.value })
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      getHotelsAction({ ...params, [e.target.name]: e.target.value })
    }, 500)

    setTimer(newTimer)
  }

  const handleSubmit = () => {
    clearTimeout(timer)
    getHotelsAction(params)
  }

  useEffect(() => {
    getHotelsAction(params)
  }, [])

  return (
    <Container>
      <div className='w-full flex'>
        <div className='max-w-xs w-[320px] border shadow-co-search py-3 px-2 h-fit sticky top-32'>
          <div className='flex flex-col gap-3 pl-2'>
            <SearchTextInput
              placeholder={'Location'}
              type={'text'}
              name={'city'}
              subTitle={'Where are you going?'}
              icon={<TiLocationArrowOutline size={18} />}
              handleChange={e => handleChange(e)}
              value={params.city}
            />

            <SearchTextInput
              placeholder={'Check In'}
              type={'date'}
              name={'checkin'}
              subTitle={'Add date'}
              icon={<BsCalendar2Week size={18} />}
            />

            <SearchTextInput
              placeholder={'Check Out'}
              type={'date'}
              name={'location'}
              subTitle={'Add date'}
              icon={<BsCalendar2Week size={18} />}
            />

            <SearchTextInput
              placeholder={'Travelers'}
              type={'number'}
              name={'location'}
              subTitle={'Travelers'}
              icon={<AiOutlineUser size={18} />}
            />

            <button
              type='submit'
              onClick={() => handleSubmit()}
              className='w-full rounded-sm  bg-co-blue text-white flex items-center justify-center'
            >
              <CiSearch size={40} className='md:hidden lg:block' />
              <p className='lg:hidden text-xl'>Search</p>
            </button>
          </div>
        </div>
        <div className='container  rounded-md px-3 pb-4 ml-5 bg-[#F4F5F6]'>
          <div className='flex -my-1  flex-wrap gap-5'>
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
                        width='calc(33.3% - 20px)'
                      />
                    </Fragment>
                  )
                )}
                {hotels?.results?.length === 0 ||
                hotels?.results === undefined ? (
                  <p className='text-center w-full text-md mt-5 font-bold text-gray-500'>
                    There is no hotel matching your query right now
                  </p>
                ) : null}
              </>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  hotels: getHotelsSelector(state),
  error: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getHotelsAction })(SearchHotel)
