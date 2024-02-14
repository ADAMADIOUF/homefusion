import React, { useEffect, useState } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'
import { useLocation } from 'react-router-dom'

const FormContact = () => {
  const location = useLocation()
  useEffect(() => {
     window.scrollTo(0, 0)
   }, [location])
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [aboutYourself, setAboutYourself] = useState('')
   const [cityOfInterest,setCityOfInterest] = useState('')
   const [message, setMessage] = useState('')
const [isFormSubmitted, setIsFormSubmitted] = useState(false)

   const [sendContactForm, { isLoading, isError }] =
     useSendContactFormMutation()

   const handleSubmit = async (e) => {
     e.preventDefault()

     try {
       const formData = {
         firstName: firstName,
         lastName: lastName,
         email: email,
         phone: phone,
         aboutYourself: aboutYourself,
         cityOfInterest: cityOfInterest,
         message: message,
       }

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
       setFirstName('')
       setLastName('')
       setEmail('')
       setPhone('')
       setAboutYourself('')
       setCityOfInterest('')
       setMessage('')
     } catch (error) {
       console.error('An error occurred while submitting the form:', error)
     }
   }
  return (
    <div className='form-contact-container'>
      <h2>How Can We Help You?</h2>
      <p>
        Would you like to discuss our services in more detail? Do you have a
        target moving date and would you like to schedule viewings of rental
        units that will be available? Can we send you additional information
        prior to a face-to-face meeting? Whatever your request, please contact
        us by email or by phone and we’ll do our best to accommodate you. We
        look forward to meeting you soon.
      </p>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name *</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name *</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email *</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone *</label>
          <input
            type='text'
            id='phoneNumber'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='aboutYourself'>
            Please tell us more about yourself:
          </label>
          <select
            id='aboutYourself'
            name='aboutYourself'
            value={aboutYourself}
            onChange={(e) => setAboutYourself(e.target.value)}
            required
          >
            <option value=''>-- Please Select --</option>
            <option value='Searching for a New Place'>
              Searching for a New Place
            </option>
            <option value='Current Resident'>Current Resident</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='cityOfInterest'>City of Interest</label>
          <input
            type='text'
            id='cityOfInterest'
            name='cityOfInterest'
            value={cityOfInterest}
            onChange={(e) => setCityOfInterest(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows='4'
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
    </div>
  )
}

export default FormContact
