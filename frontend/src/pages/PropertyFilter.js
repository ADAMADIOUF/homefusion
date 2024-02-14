import React, { useState } from 'react'

const PropertyFilter = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = () => {
    setSearchQuery(searchInput)
  }

  return (
    <div>
      <input
        type='text'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder='Search properties...'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default PropertyFilter
