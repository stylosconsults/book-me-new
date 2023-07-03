/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import { useRouter } from 'next/router'
import { AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Week } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { TiLocationArrowOutline } from 'react-icons/ti'
import DatePicker from 'react-multi-date-picker'

import SearchTextInput from 'components/molecules/SearchTextInput'
import { formatDate } from 'utils/date'
import { createQueryParams } from 'utils/params'

export default function SearchHotel() {
  const router = useRouter()
  const [params, setparams] = useState({
    city: '',
    checkin: '',
    checkout: '',
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setparams({ ...params, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const query = createQueryParams(params)
    if (query) {
      router.push(`/search?${query}`)
    }
  }

  return (
    <div
      className='w-10/12 mx-auto p-10 rounded-3xl shadow-co-search bg-co-search border border-[#FCFCFD]'
      style={{
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
    >
      {/* tab */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col lg:flex-row gap-1 lg:gap-0 justify-between items-start lg:items-center'
      >
        <SearchTextInput
          placeholder={'Name'}
          type={'text'}
          name={'name'}
          subTitle={'Hotel name'}
          handleChange={handleChange}
          icon={<AiOutlineUser size={18} />}
        />

        <SearchTextInput
          placeholder={'Location'}
          type={'text'}
          name={'city'}
          subTitle={'Where are you going?'}
          handleChange={handleChange}
          icon={<TiLocationArrowOutline size={18} />}
        />

        <DatePicker numberOfMonths={2} range render={<CustomDateInput />} />
        <button
          type='submit'
          className='w-full lg:w-20 lg:h-20 mt-2 lg:mt-0 py-2 lg:py-0 rounded-md lg:rounded-full bg-co-blue text-white flex items-center justify-center hover:scale-125 duration-500'
        >
          <CiSearch size={40} className='md:hidden lg:block' />
          <p className='lg:hidden text-xl'>Search</p>
        </button>
      </form>
    </div>
  )
}

function CustomDateInput({ openCalendar, value }: any) {
  return (
    <>
      <div className='flex gap-2 justify-between'>
        <SearchTextInput
          placeholder={'Check In'}
          type={'date'}
          name={'checkin'}
          subTitle={'Add date'}
          onFocus={openCalendar}
          value={value[0] && formatDate(new Date(value[0]))}
          icon={<BsCalendar2Week size={18} />}
        />

        <SearchTextInput
          placeholder={'Check Out'}
          type={'date'}
          name={'location'}
          subTitle={'Add date'}
          onFocus={openCalendar}
          value={value[1] && formatDate(new Date(value[1]))}
          icon={<BsCalendar2Week size={18} />}
        />
      </div>
    </>
  )
}
