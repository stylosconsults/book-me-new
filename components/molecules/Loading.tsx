import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

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
      }, 2000)

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
        <div className='overflow-hidden h-screen w-full fixed bg-white z-50 disable-scroll flex items-center justify-center'>
          <div className='animate-spin w-10 h-10 border-2 rounded-full border-l-co-blue'></div>
        </div>
      )}
    </>
  )
}
