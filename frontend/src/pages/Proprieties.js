import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useGetPropertiesQuery } from '../slices/proprietiesApiSlice'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'


const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


if (!MAPBOX_ACCESS_TOKEN) {
  console.error("Mapbox access token is missing or invalid.");
 
}

const Properties = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { data: properties, isLoading, error } = useGetPropertiesQuery()
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [filteredProperty, setFilteredProperty] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!mapRef.current && properties && properties.length > 0) {
      const firstProperty = properties[0]
      const center = [
        firstProperty.location.coordinates[0],
        firstProperty.location.coordinates[1],
      ]

      if (mapContainerRef.current) {
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
              setFilteredProperty(property)
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
          setSearchQuery(selectedAddress)
        })
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [properties])

  const filteredProperties = properties
    ? properties.filter((property) =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleShowAllProperties = () => {
    setFilteredProperty(null)
    setSearchQuery('')
  }
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  }
  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div className='container'>
        <div className='properties-container'>
          <article className='properies-item'>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div key={property._id} className='property-item'>
                  <Slider {...sliderSettings}>
                    {property.images.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt=''
                        className='img-property'
                      />
                    ))}
                  </Slider>
                  <p className='price'>Rent: ${property.price}</p>
                  <h4>{property.title}</h4>
                  <p>Type: {property.type}</p>
                  <p>{property.bedrooms} bedrooms</p>
                  <p>{property.bathrooms} bathrooms</p>
                  <p>Address: {property.address}</p>
                  <div className='details'>
                    <p className='contact'>
                      <Link to={`/product/${property._id}`}>View Details</Link>
                    </p>
                    <p className='apply'>
                      <Link to={`/apply/${property._id}`}>Apply Now</Link>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>No properties found for "{searchQuery}".</p>
              </div>
            )}
          </article>
          <article className='propertie-map'>
            {searchQuery && (
              <button onClick={handleShowAllProperties}>
                Show All Properties
              </button>
            )}

            <div
              ref={mapContainerRef}
              style={{ width: '100%', height: '900px' }}
            />
          </article>
        </div>
      </div>
    </>
  )


}

export default Properties
