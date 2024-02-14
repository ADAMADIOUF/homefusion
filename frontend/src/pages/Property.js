// Property.js
import React from 'react'

const Property = ({ property }) => {
  return (
    <div className='selected-property'>
      <img src={property.images[0]} alt='' className='img-property' />
      <h4>{property.title}</h4>
      <p>Type: {property.type}</p>
      <p>{property.bedrooms} bedrooms</p>
      <p>{property.bathrooms} bathrooms</p>
      <p>Address: {property.address}</p>
    </div>
  )
}

export default Property
