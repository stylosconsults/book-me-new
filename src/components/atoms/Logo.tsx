import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import logoimage from '../../../public/static/images/hotel/logo_m85oyx-removebg-preview.png'

export default function Logo() {
  return (
    <div className='flex items-center'>
      <Image
        src={logoimage}
        alt='Logo'
        width={50}
        height={50}
      />
      <div>
        <Link href='/' legacyBehavior passHref>
          <a className='transition-all cursor-pointer text-white font-bold text-xl block leading-3'>
            Bookme
          </a>
        </Link>
        <a
          target='_blank'
          href='https://GoDiscoverAfrica.rw'
          rel='noreferrer'
          className='leading-3 text-white hover:underline text-xs'
        >
          powered by GoDiscoverAfrica
        </a>
      </div>
    </div>
  )
}
