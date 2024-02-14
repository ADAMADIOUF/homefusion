import React, { useEffect, useState } from 'react'
import { useContactMaintenanceMutation } from '../slices/contactApiSlice'
import { useLocation } from 'react-router-dom'

const MaintenanceRequestForm = () => {
 const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    phone: '',
    description: '',
    address: '',
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [sendContactForm, { isLoading, isError }] = useContactMaintenanceMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await sendContactForm(formData)

      if (result.error) {
        console.error('Form submission failed')
      } else {
        console.log('Form submitted successfully')
        setIsFormSubmitted(true)

       
        setTimeout(() => {
          setIsFormSubmitted(false)
        }, 5000)
      }

      setFormData({
        firstName: '',
        lastName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
      })
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

 
  return (
    <form onSubmit={handleSubmit} className='section-center'>
      <h2>Maintenance Request</h2>
      <div>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          value={formData.firstName}
          onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
          required
        />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          id='lastName'
          value={formData.lastName}
          onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
          required
        />
      </div>
      <div>
        <label htmlFor='phoneNumber'>Phone Number:</label>
        <input
          type='tel'
          id='phoneNumber'
          value={formData.phone}
          onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
          required
        />
      </div>
      <div>
        <label htmlFor='address'>Address:</label>
        <textarea
          id='address'
          value={formData.address}
         onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor='subject'>Subject:</label>
        <input
          type='text'
          id='subject'
          value={formData.subject}
          onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
          required
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          value={formData.description}
         onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
          required
        ></textarea>
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
  )
}

export default MaintenanceRequestForm
