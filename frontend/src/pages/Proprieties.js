import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGetPropertiesQuery } from '../slices/proprietiesApiSlice'

const PropertiesMap = () => {
  const { data: properties, isLoading, error } = useGetPropertiesQuery()
  const [selectedLocation, setSelectedLocation] = useState(null)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading properties</p>

  const handleMarkerClick = (property) => {
    setSelectedLocation(property)
  }

  return (
    <div className='properties-map-container'>
      <div className='map'>
        <MapContainer
          center={[48.233, 101.2923]}
          zoom={13}
          style={{ height: '100vw', width: '100%' }}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {properties.map((property) => (
            <Marker
              key={property._id}
              position={property.coordinates.coordinates}
              eventHandlers={{ click: () => handleMarkerClick(property) }}
            >
              <Popup>
                {property.title} - {property.bedrooms}
                <br />
                <img
                  src={property.images[0]}
                  alt={property.title}
                  style={{ width: '100%' }}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className='properties'>
        {properties.map((property) => (
          <div key={property._id} className='property-item'>
            <img
              src={property.images[0]}
              alt={property.title}
              className='properties-img'
            />
            <h4>{property.title}</h4>
            <p>{property.location}</p>
            <p>Type: {property.type}</p>
            <p>{property.bedrooms}: bedrooms</p>
            <p>{property.bathrooms}: bathrooms</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertiesMap
