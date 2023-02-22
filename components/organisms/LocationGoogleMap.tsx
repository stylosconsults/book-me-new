import { useMemo } from 'react'

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import type { NextPage } from 'next'

const LocationGoogleMap: NextPage = () => {
  const libraries = useMemo(() => ['places'], [])
  const mapCenter = useMemo(() => ({ lat: -1.983488, lng: 30.123173 }), [])

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: '100%', height: '30em' }}
      // onLoad={() => console.log('Map Component Loaded...')}
    >
      <MarkerF
        position={mapCenter}
        // onLoad={() => console.log('Marker Loaded')}
      />
    </GoogleMap>
  )
}

export default LocationGoogleMap
