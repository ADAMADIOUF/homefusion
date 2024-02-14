import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiYWR6byIsImEiOiJjbGxuM3I4bDAxamY3M2Zta3g1bDFzcW1uIn0.ZGeKPPGll20CXvCugc0fwQ'

const PropertyMap = ({ properties }) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (properties && properties.length > 0) {
      const firstProperty = properties[0]
      const center = [
        firstProperty.location.coordinates[0],
        firstProperty.location.coordinates[1],
      ]

      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom: 10,
      })

      mapRef.current = map

      markersRef.current = properties.map((property) => {
        const { longitude, latitude, title } = property

        if (!isNaN(longitude) && !isNaN(latitude)) {
          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current)

          marker.getElement().addEventListener('click', () => {
            console.log(`Marker clicked for property: ${title}`)
            // Handle marker click
          })

          return marker
        } else {
          console.error(`Invalid coordinates for property: ${title}`)
          return null
        }
      })

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      })

      mapRef.current.addControl(geocoder)

      geocoder.on('result', (e) => {
        const selectedAddress = e.result.text
        // Handle selected address
      })
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [properties])

  return (
    <div ref={mapContainerRef} style={{ width: '100vw', height: '800px' }} />
  )
}

export default PropertyMap
