import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useContactFormMutation } from '../slices/contactApiSlice'
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [formData, setFormData] = useState({
    moveInDate: new Date(),
    availableDate: new Date(),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    monthlyIncome: '',
    optionalInfo: {
      pets: {
        cat: false,
        dog: false,
        other: false,
      },
    },
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [sendContactForm, { isLoading, isError }] = useContactFormMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await sendContactForm(formData)

      if (result.error) {
        console.error('Form submission failed')
      } else {
        console.log('Form submitted successfully')
        setIsFormSubmitted(true)

        // Set a timeout to reset the isFormSubmitted state after 5 seconds
        setTimeout(() => {
          setIsFormSubmitted(false)
        }, 5000)
      }

      // Clear the form fields after submission
      setFormData({
        moveInDate: new Date(),
        availableDate: new Date(),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        monthlyIncome: '',
        optionalInfo: {
          pets: {
            cat: false,
            dog: false,
            other: false,
          },
        },
      })
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  const handleCalendarChange = (date, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.startsWith('optionalInfo.pets')) {
      // Handle checkbox inputs for pets
      const petName = name.split('.')[2] // Extract pet name (cat, dog, other)
      setFormData((prevFormData) => ({
        ...prevFormData,
        optionalInfo: {
          ...prevFormData.optionalInfo,
          pets: {
            ...prevFormData.optionalInfo.pets,
            [petName]: checked,
          },
        },
      }))
    } else {
      // Handle other inputs
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  return (
    <div className='contact-container'>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='moveInDate'>Desired Move In Date *</label>
          <DatePicker
            selected={formData.moveInDate}
            onChange={(date) => handleCalendarChange(date, 'moveInDate')}
            dateFormat='MM/dd/yyyy'
            placeholderText='mm/dd/yyyy'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='availableDate'>Available Date *</label>
          <DatePicker
            selected={formData.availableDate}
            onChange={(date) => handleCalendarChange(date, 'availableDate')}
            dateFormat='MM/dd/yyyy'
            placeholderText='mm/dd/yyyy'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name *</label>
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
          <label htmlFor='lastName'>Last Name *</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email *</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows='4'
            required
          ></textarea>
        </div>
        <div className='optional-info'>
          <h3>Enter optional information</h3>
          <div className='form-group'>
            <label htmlFor='monthlyIncome'>Monthly Income</label>
            <input
              type='text'
              id='monthlyIncome'
              name='monthlyIncome'
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
          </div>
          {/* Add other optional fields */}
          <div className='form-group'>
            <label htmlFor='cat'>Cat</label>
            <input
              type='checkbox'
              id='cat'
              name='optionalInfo.pets.cat'
              checked={formData.optionalInfo.pets.cat}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dog'>Dog</label>
            <input
              type='checkbox'
              id='dog'
              name='optionalInfo.pets.dog'
              checked={formData.optionalInfo.pets.dog}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='other'>Other</label>
            <input
              type='checkbox'
              id='other'
              name='optionalInfo.pets.other'
              checked={formData.optionalInfo.pets.other}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type='submit' className='btn-contact' disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
        {isFormSubmitted && !isError && (
          <p className='success-message'>
            Message sent successfully! We will respond to you soon.
          </p>
        )}
        {isError && (
          <p className='error-message'>
            An error occurred while submitting the form. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}

export default Contact
