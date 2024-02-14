import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContactApplicationMutation } from '../slices/contactApiSlice'

const Application = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    email: '',
    confirmEmail: '',
    phoneNumber: '',
    phoneType: '',
    howDidYouHear: '',
    applicationType: '', 
  })
const [sendContactForm, { isLoading:loadingContact, isError }] =
  useContactApplicationMutation()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    navigate('/where-youve-lived', { state: { formData } })
  }

  return (
    <div className='application-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>(701) 852-3648</p>
      <form onSubmit={handleSubmit}>
        <h3>Your Contact Info</h3>
        <div className='form-group'>
          <label htmlFor='firstName'>Legal First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='middleName'>Middle Name</label>
          <input
            type='text'
            id='middleName'
            name='middleName'
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='suffix'>Suffix</label>
          <input
            type='text'
            id='suffix'
            name='suffix'
            value={formData.suffix}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmEmail'>Confirm Email</label>
          <input
            type='email'
            id='confirmEmail'
            name='confirmEmail'
            value={formData.confirmEmail}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phoneType'>Phone Type</label>
          <select
            id='phoneType'
            name='phoneType'
            value={formData.phoneType}
            onChange={handleChange}
          >
            <option value=''>Select</option>
            <option value='mobile'>Mobile</option>
            <option value='home'>Home</option>
            <option value='work'>Work</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='howDidYouHear'>How did you hear about us?</label>
          <input
            type='text'
            id='howDidYouHear'
            name='howDidYouHear'
            value={formData.howDidYouHear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='applicationType'>Application Type</label>
          <select
            id='applicationType'
            name='applicationType'
            value={formData.applicationType}
            onChange={handleChange}
            required
          >
            <option value=''>Select</option>
            <option value='tenant'>Tenant</option>
            <option value='guarantor'>Guarantor</option>
          </select>
        </div>
        <button className='btn' type='submit'>
          {loadingContact ? 'Sending...' : 'Continue'}
        </button>
      </form>
    </div>
  )
}

export default Application
