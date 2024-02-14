import React from 'react'
import { useGetPropertiesQuery } from '../slices/proprietiesApiSlice'
import Tenant from './Tenant';
import { Link } from 'react-router-dom';

const Featured = () => {
  const { data: properties, isLoading, error } = useGetPropertiesQuery()
console.log(properties);
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  
  const featuredProperties = properties.filter((property) => property.featured)

  return (
    <div className='featured section-center'>
      <div className='title'>
        <h3>Featured Properties</h3>
      </div>
      <div className='featured-list'>
        {featuredProperties.map((property) => (
          <div key={property._id} className='featured-item'>
            <p>
              <Link to={`/product/${property._id}`}>
                <img src={property.images[0]} alt={property.title} />
                <h4>{property.title}</h4>
                <p>Address: {property.address}</p>
                <p>Type: {property.type}</p>
              </Link>
            </p>
          </div>
        ))}
      </div>
      <Tenant />
    </div>
  )
}

export default Featured
