import React from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Week } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { TiLocationArrowOutline } from 'react-icons/ti'

import Container from 'components/Container'
import SearchTextInput from 'components/molecules/SearchTextInput'

export default function search() {
  return (
    <Container>
      <div className='w-full flex'>
        <div className='max-w-xs w-[320px] border shadow-co-search py-3 px-2'>
          <div className='flex flex-col gap-3 pl-2'>
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
              className='w-full rounded-sm  bg-co-blue text-white flex items-center justify-center'
            >
              <CiSearch size={40} className='md:hidden lg:block' />
              <p className='lg:hidden text-xl'>Search</p>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
