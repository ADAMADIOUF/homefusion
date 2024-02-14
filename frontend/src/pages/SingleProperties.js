import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useGetProprietiesByIdQuery } from '../slices/proprietiesApiSlice'
import { Link, useParams } from 'react-router-dom'

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const SingleProperties = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { id: productId } = useParams()
  const {
    data: product,
    isLoading,
    error,
  } = useGetProprietiesByIdQuery(productId)
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!mapRef.current && product && product.location) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          product.location.coordinates[0],
          product.location.coordinates[1],
        ],
        zoom: 10,
      })

      new mapboxgl.Marker()
        .setLngLat([
          product.location.coordinates[0],
          product.location.coordinates[1],
        ])
        .addTo(map)

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [product])

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        if (currentIndex === product.images.length - 1) {
          setCurrentIndex(0)
        } else {
          setCurrentIndex(currentIndex + 1)
        }
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [currentIndex, isPlaying, product])

  const openGallery = (index) => {
    setCurrentIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const nextImage = () => {
    if (currentIndex < product.images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!product) {
    return <div>No data found for the given ID.</div>
  }

  return (
    <div className='featured-item section-center'>
      <div className='image-gallery'>
        {product.images.map((image, index) => (
          <article
            key={index}
            onClick={() => openGallery(index)}
            data-aos='fade-up'
            className='photo-img'
          >
            <img src={image} alt={`Image ${index + 1}`} />
            <div className='image-overlay'>
              <h3>{product.title}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className='property-details'>
        <p className='price'>Rent: ${product.price}</p>
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>

        <p>Address: {product.address}</p>
        <p>Bedrooms: {product.bedrooms}</p>
        <p>Bathrooms: {product.bathrooms}</p>
        <p>Type: {product.type}</p>
      </div>
      <div className='contact-apply'>
        <div className='contact'>
          <Link to={`/contact/${product._id}`}>Contact Us</Link>
        </div>
        <div className='apply'>
          <Link to={`/apply/${product._id}`}>Apply Now</Link>
        </div>
      </div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />

      {isGalleryOpen && (
        <div className='gallery'>
          <img
            src={product.images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
          />
          <button className='play-pause' onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className='container-btn'>
            <button className='prev-btn' onClick={prevImage}>
              Prev
            </button>
            <button className='next-btn' onClick={nextImage}>
              Next
            </button>
          </div>
          <button className='close' onClick={closeGallery}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default SingleProperties
