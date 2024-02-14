import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton'

const ApplicationFees = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    billingAddress1: '',
    billingAddress2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    creditCardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    savePaymentInfo: false,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleContinue = () => {
    // Here you can handle form submission or validation
    // and then navigate to the next step of the application process
    navigate('/questions')
  }

  return (
    <div className='application-fees-container section-center'>
      <h2>Pay Fees</h2>
      <p>
        The following fees are necessary for us to verify your rental
        application:
      </p>
      <p>Application Fee: $55.00</p>

      <h3>BILLING INFORMATION</h3>
      <p>Your payment information is secure.</p>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      {/* Add other input fields for billing information */}
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
        <label htmlFor='billingAddress1'>Billing Address 1</label>
        <input
          type='text'
          id='billingAddress1'
          name='billingAddress1'
          value={formData.billingAddress1}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='billingAddress2'>Billing Address 2</label>
        <input
          type='text'
          id='billingAddress2'
          name='billingAddress2'
          value={formData.billingAddress2}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          name='city'
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='state'>State/Province</label>
        <input
          type='text'
          id='state'
          name='state'
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='zip'>ZIP</label>
        <input
          type='text'
          id='zip'
          name='zip'
          value={formData.zip}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='country'>Country</label>
        <input
          type='text'
          id='country'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='creditCardNumber'>Credit Card Number</label>
        <input
          type='text'
          id='creditCardNumber'
          name='creditCardNumber'
          value={formData.creditCardNumber}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='expirationMonth'>Expiration Date</label>
        <div>
          <input
            type='text'
            id='expirationMonth'
            name='expirationMonth'
            value={formData.expirationMonth}
            onChange={handleChange}
            placeholder='Month'
          />
          <input
            type='text'
            id='expirationYear'
            name='expirationYear'
            value={formData.expirationYear}
            onChange={handleChange}
            placeholder='Year'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='securityCode'>Security Code</label>
        <input
          type='text'
          id='securityCode'
          name='securityCode'
          value={formData.securityCode}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='checkbox'
          id='savePaymentInfo'
          name='savePaymentInfo'
          checked={formData.savePaymentInfo}
          onChange={handleChange}
        />
        <label htmlFor='savePaymentInfo'>
          Save this payment information for future use with Investors Management
          & Marketing Inc.
        </label>
      </div>
      {/* PayPal button */}
      <PayPalButton amount={55.0} />
      {/* Button to continue */}
      <button onClick={handleContinue}className='btn'>Continue</button>
    </div>
  )
}

export default ApplicationFees
