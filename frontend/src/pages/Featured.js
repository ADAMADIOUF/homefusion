import React from 'react'
import { useGetPropertiesQuery } from '../slices/proprietiesApiSlice'

const Featured = () => {
  const { data: properties, isLoading, error } = useGetPropertiesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Filter to only include properties where featured is true
  const featuredProperties = properties.filter((property) => property.featured)

  return (
    <div className='featured section-center'>
      <div className='title'>
        <h3>Featured Properties</h3>
      </div>
      <div className='featured-list'>
        {featuredProperties.map((property) => (
          <div key={property._id} className='featured-item'>
            <img src={property.images[0]} alt={property.title} />
            <h4>{property.title}</h4>
            <p>{property.location}</p>
            <p>Type: {property.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Featured
