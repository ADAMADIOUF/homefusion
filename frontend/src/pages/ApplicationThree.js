import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApplicationThree = () => {
  const [formData, setFormData] = useState({
    hasCoApplicants: false,
    hasOtherOccupants: false,
    hasPets: false,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }))
  }

  const handleContinue = () => {
    
    navigate('/personal-information', { state: { formData } })
  }

  return (
    <div className='application-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>(701) 852-3648</p>

      <h3>Occupant Information</h3>

      <div className='form-group'>
        <label htmlFor='hasCoApplicants'>
          I am applying with Co-Applicants who will be signing the lease
        </label>
        <input
          type='checkbox'
          id='hasCoApplicants'
          name='hasCoApplicants'
          checked={formData.hasCoApplicants}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='hasOtherOccupants'>
          I will have other occupants living with me who will not be signing the
          lease
        </label>
        <input
          type='checkbox'
          id='hasOtherOccupants'
          name='hasOtherOccupants'
          checked={formData.hasOtherOccupants}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='hasPets'>I have pets</label>
        <input
          type='checkbox'
          id='hasPets'
          name='hasPets'
          checked={formData.hasPets}
          onChange={handleChange}
        />
      </div>

     
      <button onClick={handleContinue}className='btn'>Continue</button>
    </div>
  )
}

export default ApplicationThree
