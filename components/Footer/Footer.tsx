import Link from 'next/link'

export default function Footer() {
  return (
    <div className='mx-auto my-16 mb-3 text-center text-quaternary px-10 lg:px-0'>
      <div className='flex justify-between flex-wrap'>
        <div className='text-left'>
          <Link href='/' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary font-bold text-xl block leading-3'>
              Bookme
            </a>
          </Link>
          <p>
            Your favorite hotel booking <br /> since 2022!
          </p>
        </div>
        <div className='text-right'>
          <Link href='/about' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'>
              Help
            </a>
          </Link>
          <Link href='/about' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'>
              FAQ
            </a>
          </Link>
          <Link href='/about' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'>
              About
            </a>
          </Link>
          <Link href='/about' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'>
              Customer Service
            </a>
          </Link>
          <Link href='/about' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'>
              Contact us
            </a>
          </Link>
        </div>
      </div>
      <p>
        {new Date().getFullYear()} &copy; Developed by
        <a
          className='ml-1 text-secondary hover:text-primary group'
          href='https://stylosconsults.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Stylos Consults
          <span className='ml-1 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100'>
            {'↗'}
          </span>
        </a>
      </p>
    </div>
  )
}
