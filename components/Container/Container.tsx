import React from 'react'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import Footer from 'components/Footer/Footer'
import Navbar from 'components/organisms/Navbar'
import cn from 'lib/classNames'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const { children, title, description, image, hotelName, ...customMeta } =
    props
  const router = useRouter()

  const meta = {
    title: title ?? 'Bookme',
    description: description ?? 'Booking Platform for african restaurents',
    image:
      image ??
      'https://res.cloudinary.com/igitego-hotels/image/upload/v1675936956/Logos/logo_m85oyx.png',
    type: 'website',
    ...customMeta,
  }

  return (
    <>
      <div
        className={cn(
          'text-primary',
          'relative h-full min-h-screen w-full',
          'flex flex-col',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <Head>
          <meta name='robots' content='follow, index' />
          <meta
            property='og:url'
            content={`https://template.cretu.dev/${router.asPath}`}
          />
          <link
            rel='canonical'
            href={`https://template.cretu.dev/${router.asPath}`}
          />
          <meta property='og:type' content={meta.type} />
          <meta property='og:site_name' content='Bookme' />
          <meta property='og:description' content={meta.description} />
          <meta property='og:title' content={meta.title} />
          <meta property='og:image' content={meta.image} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@GodiscoverA' />
          <meta name='twitter:title' content={meta.title} />
          <meta name='twitter:description' content={meta.description} />
          <meta name='twitter:image' content={meta.image} />
          {meta.date && (
            <meta property='article:published_time' content={meta.date} />
          )}
          <title>Bookme.rw - book hotels for your trip to rwanda</title>
        </Head>

        <nav className='md:sticky w-full z-50 bg-gray-100/10 font-sans filter-blur dark:bg-gray-1000/40 top-2 sm:px-3 md:top-4 max-w-6xl md:py-2 rounded-md mx-auto flex flex-col md:flex-row justify-between md:items-center items-start pl-5 py-5 md:pl-0'>
          <Navbar />
        </nav>

        <main
          className={cn(
            'mt-12',
            'max-w-6xl w-full',
            'mx-auto my-auto',
            'flex flex-col justify-center gap-12',
            'divide-y divide-gray-200 dark:divide-gray-900',
            'rounded-lg'
          )}
        >
          <div>{children}</div>
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    </>
  )
}
