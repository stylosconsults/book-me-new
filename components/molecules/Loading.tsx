import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Spinner from 'components/atoms/Spinner'

export default function Loading() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true)
    const handleComplete = (url: string) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false)
      }, 1000)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <>
      {loading && (
        <div className='overflow-hidden h-fit w-fit left-1/2 translate-x-1/2 translate-y-1/2 fixed bg-transparent z-50 disable-scroll flex items-center justify-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}
