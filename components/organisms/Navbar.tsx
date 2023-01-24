import React, { Fragment } from 'react'

import Link from 'next/link'
import { AiOutlineUser, AiOutlineBell } from 'react-icons/ai'

import Button from 'components/atoms/Button'

export default function Navbar() {
  return (
    <Fragment>
      <div className='flex flex-row gap-1 text-tertiary'>
        <div className=''>
          <Link href='/' legacyBehavior>
            <a className='transition-all cursor-pointer text-primary font-bold text-xl block leading-3'>
              Bookme
            </a>
          </Link>
          <a
            target='_blank'
            href='https://GoDiscoverAfrica.rw'
            rel='noreferrer'
            className='leading-3 text-secondary hover:underline text-xs'
          >
            power by GoDiscoverAfrica
          </a>
        </div>
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <Link href='/about' legacyBehavior>
          <a className='transition-all cursor-pointer text-primary hover:text-secondary'>
            Support
          </a>
        </Link>
        <Link href='/about' legacyBehavior>
          <a className='transition-all cursor-pointer text-primary hover:text-secondary'>
            Language
          </a>
        </Link>
        <Button>Switch to experience</Button>
        <div className='text-gray-600 relative cursor-pointer'>
          <AiOutlineBell size={18} />
          <div className='w-3 h-3 bg-co-green rounded-full absolute top-0 right-0'></div>
        </div>
        {/* person profile placeholder */}
        <div className='w-8 h-8 bg-co-green rounded-full text-white flex cursor-pointer items-center justify-center'>
          <AiOutlineUser size={18} />
        </div>
      </div>
    </Fragment>
  )
}