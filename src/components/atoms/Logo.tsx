import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className='flex items-center'>
      <Image
        src='https://res.cloudinary.com/igitego-hotels/image/upload/v1675936956/Logos/logo_m85oyx.png'
        alt='Logo'
        width={50}
        height={50}
        loading="eager"
        quality={75}
      />
      <div>
        <Link href='/' className='transition-all cursor-pointer text-primary font-bold text-xl block leading-3'>
          Bookme
        </Link>
        <a
          target='_blank'
          href='https://GoDiscoverAfrica.rw'
          rel='noreferrer'
          className='leading-3 text-secondary hover:underline text-xs'
        >
          powered by GoDiscoverAfrica
        </a>
      </div>
    </div>
  )
}
