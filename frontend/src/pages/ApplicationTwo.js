import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContactApplicationMutation } from '../slices/contactApiSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ApplicationTwo = () => {
  const [formData, setFormData] = useState({
    currentAddress: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      residedFromMonth: '',
      residedFromYear: new Date(),
      monthlyRent: '',
      landlord: '',
      landlordPhoneNumber: '',
      landlordEmail: '',
      reasonForLeaving: '',
    },
    previousAddresses: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      residedFromMonth: '',
      residedFromYear: '',
      residedToMonth: '',
      residedToYear: '',
      monthlyRent: '',
      landlord: '',
      landlordPhoneNumber: '',
      landlordEmail: '',
      reasonForLeaving: '',
    },
  })

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const navigate = useNavigate()
  const [sendContactForm, { isLoading, isError }] =
    useContactApplicationMutation()

  const handleChange = (e, section, name) => {
    const { value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save the form data and navigate to the next step
    navigate('/co-applicants', { state: { formData } })
  }

  const handleCalendarChange = (date, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      currentAddress: {
        ...prevFormData.currentAddress,
        [name]: date,
      },
    }))
  }

  return (
    <div className='application-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>(701) 852-3648</p>

      <h3>Where You've Lived</h3>

      <form onSubmit={handleSubmit}>
        <h4>Current Address</h4>
        <div className='form-group'>
          <label htmlFor='address1'>Address 1</label>
          <input
            type='text'
            id='address1'
            name='address1'
            value={formData.currentAddress.address1}
            onChange={(e) => handleChange(e, 'currentAddress', 'address1')}
          />
          <label htmlFor='address2'>Address 2</label>
          <input
            type='text'
            id='address2'
            name='address2'
            value={formData.currentAddress.address2}
            onChange={(e) => handleChange(e, 'currentAddress', 'address2')}
          />

          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.currentAddress.city}
            onChange={(e) => handleChange(e, 'currentAddress', 'city')}
          />

          <label htmlFor='state'>State</label>
          <input
            type='text'
            id='state'
            name='state'
            value={formData.currentAddress.state}
            onChange={(e) => handleChange(e, 'currentAddress', 'state')}
          />

          <label htmlFor='zip'>ZIP</label>
          <input
            type='text'
            id='zip'
            name='zip'
            value={formData.currentAddress.zip}
            onChange={(e) => handleChange(e, 'currentAddress', 'zip')}
          />

          <label htmlFor='country'>Country</label>
          <input
            type='text'
            id='country'
            name='country'
            value={formData.currentAddress.country}
            onChange={(e) => handleChange(e, 'currentAddress', 'country')}
          />

          <label htmlFor='residedFromMonth'>Resided From Month:</label>
          <select
            id='residedFromMonth'
            name='residedFromMonth'
            value={formData.currentAddress.residedFromMonth}
            onChange={(e) =>
              handleChange(e, 'currentAddress', 'residedFromMonth')
            }
          >
            <option value=''>Select a month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>

          <label htmlFor='residedFromYear'>Resided From (Year)</label>
          <DatePicker
            selected={formData.currentAddress.residedFromYear}
            onChange={(date) => handleCalendarChange(date, 'residedFromYear')}
            dateFormat='MM/dd/yyyy'
            placeholderText='mm/dd/yyyy'
          />

          <label htmlFor='monthlyRent'>Monthly Rent:</label>
          <input
            type='text'
            id='monthlyRent'
            name='monthlyRent'
            value={formData.currentAddress.monthlyRent}
            onChange={(e) => handleChange(e, 'currentAddress', 'monthlyRent')}
          />

          <label htmlFor='landlord'>Landlord</label>
          <input
            type='text'
            id='landlord'
            name='landlord'
            value={formData.currentAddress.landlord}
            onChange={(e) => handleChange(e, 'currentAddress', 'landlord')}
            required
          />

          <label htmlFor='landlordPhoneNumber'>Landlord Phone Number</label>
          <input
            type='text'
            id='landlordPhoneNumber'
            name='landlordPhoneNumber'
            value={formData.currentAddress.landlordPhoneNumber}
            onChange={(e) =>
              handleChange(e, 'currentAddress', 'landlordPhoneNumber')
            }
            required
          />

          <label htmlFor='landlordEmail'>Landlord Email Address</label>
          <input
            type='text'
            id='landlordEmail'
            name='landlordEmail'
            value={formData.currentAddress.landlordEmail}
            onChange={(e) => handleChange(e, 'currentAddress', 'landlordEmail')}
            required
          />

          <label htmlFor='reasonForLeaving'>Reason For Leaving</label>
          <input
            type='text'
            id='reasonForLeaving'
            name='reasonForLeaving'
            value={formData.currentAddress.reasonForLeaving}
            onChange={(e) =>
              handleChange(e, 'currentAddress', 'reasonForLeaving')
            }
            required
          />
        </div>
        <div className='form-group'>
          <h4>Previous Address</h4>
          <label htmlFor='previous-address1'>Previous Address 1</label>
          <input
            type='text'
            id='previous-address1'
            name='previous-address1'
            value={formData.previousAddresses.address1}
            onChange={(e) => handleChange(e, 'previousAddresses', 'address1')}
          />

          <label htmlFor='previous-address2'>Previous Address 2</label>
          <input
            type='text'
            id='previous-address2'
            name='previous-address2'
            value={formData.previousAddresses.address2}
            onChange={(e) => handleChange(e, 'previousAddresses', 'address2')}
          />

          <label htmlFor='previous-city'>Previous City</label>
          <input
            type='text'
            id='previous-city'
            name='previous-city'
            value={formData.previousAddresses.city}
            onChange={(e) => handleChange(e, 'previousAddresses', 'city')}
          />

          <label htmlFor='previous-state'>Previous State</label>
          <input
            type='text'
            id='previous-state'
            name='previous-state'
            value={formData.previousAddresses.state}
            onChange={(e) => handleChange(e, 'previousAddresses', 'state')}
          />

          <label htmlFor='previous-zip'>Previous ZIP</label>
          <input
            type='text'
            id='previous-zip'
            name='previous-zip'
            value={formData.previousAddresses.zip}
            onChange={(e) => handleChange(e, 'previousAddresses', 'zip')}
          />
        </div>

        <button type='submit' className='btn'>
          {isLoading ? 'Submitting...' : 'Continue'}
        </button>
      </form>
    </div>
  )
}

export default ApplicationTwo
