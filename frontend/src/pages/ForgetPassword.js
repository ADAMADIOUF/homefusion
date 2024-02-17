// ForgotPassword.js
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '../slices/usersApiSlice'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading,isError }] = useForgotPasswordMutation()
const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await forgotPassword({ email })
     setIsFormSubmitted(true)
     setTimeout(() => {
       setIsFormSubmitted(false)
     }, 5000)
    // Handle response, show notification, etc.
  }

  return (
    <form onSubmit={handleSubmit} className='section-center'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type='submit' disabled={isLoading}>
        Submit
      </button>
      {isFormSubmitted && !isError && (
        <p className='success-message'>
          Message sent successfully! We will respond to you soon.
        </p>
      )}
    </form>
  )
}

export default ForgotPassword
