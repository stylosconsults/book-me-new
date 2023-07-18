import Link from 'next/link'

export default function Footer() {
  return (
    <div className='mx-auto my-16 mb-3 text-center text-quaternary'>
      <div className='flex justify-between flex-wrap'>
        <div className='text-left'>
          <Link href='/' legacyBehavior>
            <a className='transition-all mb-3 cursor-pointer text-primary font-bold text-xl block leading-3'>
              Bookme
            </a>
          </Link>
          <p>
            Your favorite car rental <br /> since 2022!
          </p>
        </div>
        <div className='text-left'>
          <h1 className='mb-2 font-bold text-base'>Company</h1>
          <Link
            href={'/contact-us'}
            className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'
            rel='noreferrer'
          >
            Help
          </Link>
          <Link
            href='/faq'
            className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'
            rel='noreferrer'
          >
            FAQ
          </Link>
          <Link
            href='/about-us'
            className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'
            rel='noreferrer'
          >
            About
          </Link>
          <Link
            href='/customer-services'
            className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'
            rel='noreferrer'
          >
            Customer Service
          </Link>
          <Link
            href='/contact-us'
            className='transition-all mb-3 cursor-pointer text-primary text-sm block leading-3'
            rel='noreferrer'
          >
            Contact us
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
          GoDiscover Africa
          <span className='ml-1 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100'>
            {'↗'}
          </span>
        </a>
      </p>
    </div>
  )
}
