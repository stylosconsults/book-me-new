import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import Footer from 'components/organisms/footer'
import Navbar from 'components/organisms/navbar'
import Sidebar from 'components/organisms/sidebar'
import cn from 'lib/classNames'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const { children, withSidebar = false, ...customMeta } = props
  const router = useRouter()

  const meta = {
    title: 'Template name',
    description: 'Template description',
    image:
      'https://cdn.discordapp.com/attachments/797485737272541250/893912493255176192/UnicornVectorGradient_7.png',
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
          <meta property='og:site_name' content='Bookme Rwanda' />
          <meta property='og:description' content={meta.description} />
          <meta property='og:title' content={meta.title} />
          <meta property='og:image' content={meta.image} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@bookme' />
          <meta name='twitter:title' content={meta.title} />
          <meta name='twitter:description' content={meta.description} />
          <meta name='twitter:image' content={meta.image} />
          {meta.date && (
            <meta property='article:published_time' content={meta.date} />
          )}
        </Head>

        <nav
          className='sticky w-full bg-white z-[9999] filter-blur dark:bg-black top-0 px-4 md:px-10 py-5
         rounded-md mx-auto flex justify-between items-center shadow-sm'
        >
          <Navbar />
        </nav>

        <main
          className={cn(
            'w-full flex-grow relative px-4 md:px-10 py-4',
            'mx-auto my-auto',
            'flex gap-12',
            withSidebar ? 'flex-row' : 'flex-col',
            'bg-[#F6F7F9]',
            'divide-y divide-gray-200 dark:divide-gray-900'
          )}
        >
          {withSidebar && (
            <div className='bg-white shadow-sm min-w-[300px] hidden md:block'>
              <div className='overflow-auto sticky top-[82px] '>
                <Sidebar />
              </div>
            </div>
          )}
          <div>{children}</div>
        </main>
        <footer className='px-4 md:px-10 bg-white'>
          <Footer />
        </footer>
      </div>
    </>
  )
}
