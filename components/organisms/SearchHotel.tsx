import React from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Week } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { TiLocationArrowOutline } from 'react-icons/ti'

import SearchTextInput from 'components/molecules/SearchTextInput'

export default function SearchHotel() {
  return (
    <div
      className='w-10/12 mx-auto p-10 rounded-3xl shadow-co-search bg-co-search border border-[#FCFCFD]'
      style={{
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
    >
      {/* tab */}
      <div className='flex flex-col lg:flex-row gap-1 lg:gap-0 justify-between items-start lg:items-center'>
        <SearchTextInput
          placeholder={'Location'}
          type={'text'}
          name={'location'}
          subTitle={'Where are you going?'}
          icon={<TiLocationArrowOutline size={18} />}
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
          className='w-full lg:w-20 lg:h-20 mt-2 lg:mt-0 py-2 lg:py-0 rounded-md lg:rounded-full bg-co-blue text-white flex items-center justify-center hover:scale-125 duration-500'
        >
          <CiSearch size={40} className='md:hidden lg:block' />
          <p className='lg:hidden text-xl'>Search</p>
        </button>
      </div>
    </div>
  )
}
