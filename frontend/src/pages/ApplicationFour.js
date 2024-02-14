import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApplicationFour = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    socialSecurityNumber: '',
    governmentID: '',
    issuingState: '',
    emergencyContact: {
      name: '',
      address: '',
      relationship: '',
      phone: '',
      email: '',
    },
    hasVehicles: false,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }))
    } else if (name.startsWith('emergencyContact')) {
      const contactField = name.split('.')[1]
      setFormData((prevFormData) => ({
        ...prevFormData,
        emergencyContact: {
          ...prevFormData.emergencyContact,
          [contactField]: value,
        },
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleContinue = () => {
    // Here you can handle form submission or validation
    // and then navigate to the next step of the application process
    navigate('/your-income', { state: { formData } })
  }

  return (
    <div className='application-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>(701) 852-3648</p>

      <h3>Personal Information</h3>

      <div className='form-group'>
        <label htmlFor='dateOfBirth'>Date of Birth</label>
        <input
          type='text'
          id='dateOfBirth'
          name='dateOfBirth'
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='socialSecurityNumber'>
          Social Security Number (or ITIN)
        </label>
        <input
          type='text'
          id='socialSecurityNumber'
          name='socialSecurityNumber'
          value={formData.socialSecurityNumber}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='governmentID'>Government Issued ID</label>
        <input
          type='text'
          id='governmentID'
          name='governmentID'
          value={formData.governmentID}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='issuingState'>Issuing State/Territory</label>
        <input
          type='text'
          id='issuingState'
          name='issuingState'
          value={formData.issuingState}
          onChange={handleChange}
        />
      </div>

      <h3>Emergency Contact</h3>

      <div className='form-group'>
        <label htmlFor='emergencyContactName'>Name</label>
        <input
          type='text'
          id='emergencyContactName'
          name='emergencyContact.name'
          value={formData.emergencyContact.name}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='emergencyContactAddress'>
          Full Address (city, state, zip)
        </label>
        <input
          type='text'
          id='emergencyContactAddress'
          name='emergencyContact.address'
          value={formData.emergencyContact.address}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='emergencyContactRelationship'>Relationship</label>
        <input
          type='text'
          id='emergencyContactRelationship'
          name='emergencyContact.relationship'
          value={formData.emergencyContact.relationship}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='emergencyContactPhone'>Phone</label>
        <input
          type='text'
          id='emergencyContactPhone'
          name='emergencyContact.phone'
          value={formData.emergencyContact.phone}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='emergencyContactEmail'>Email Address</label>
        <input
          type='text'
          id='emergencyContactEmail'
          name='emergencyContact.email'
          value={formData.emergencyContact.email}
          onChange={handleChange}
        />
      </div>

      <h3>Vehicles</h3>

      <div className='form-group'>
        <label htmlFor='hasVehicles'>I have one or more vehicles</label>
        <input
          type='checkbox'
          id='hasVehicles'
          name='hasVehicles'
          checked={formData.hasVehicles}
          onChange={handleChange}
        />
      </div>

     
      <button onClick={handleContinue}className='btn'>Continue</button>
    </div>
  )
}

export default ApplicationFour
