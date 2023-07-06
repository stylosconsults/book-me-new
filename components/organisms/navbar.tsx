import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from 'components/atoms/Logo'
import cn from 'lib/classNames'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <div className='flex flex-row gap-1 text-tertiary'>
        <Logo />
      </div>
      <div
        className={cn(
          'flex flex-row items-center font-bold space-x-4',
          pathname?.includes('contact') ? 'text-blue-500' : ''
        )}
      >
        <Link href='/contact-us'>Contact us</Link>
      </div>
    </>
  )
}
