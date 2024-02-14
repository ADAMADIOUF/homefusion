import React from 'react'
import { Link } from 'react-router-dom'

const PropertyList = ({ properties, searchQuery }) => {
  // Add a conditional check to ensure properties is defined
  const filteredProperties = properties
    ? properties.filter((property) =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <div className='properties-container'>
      {filteredProperties.length > 0 ? (
        filteredProperties.map((property) => (
          <div key={property._id} className='property-item'>
            <img src={property.images[0]} alt='' className='img-property' />
            <h4>{property.title}</h4>
            <p>Type: {property.type}</p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.bathrooms} bathrooms</p>
            <p>Address: {property.address}</p>
          </div>
        ))
      ) : (
        <div>
          <p>
            No properties found for "{searchQuery}".
            <Link to='/properties'>Go Back</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default PropertyList
