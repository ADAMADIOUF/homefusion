import React, { useState, useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useContactApplicationMutation } from '../slices/contactApiSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ReviewAndConfirm = () => {
  const navigate = useNavigate()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
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
    employerName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    employerPhoneNumber: '',
    monthlySalary: '',
    positionHeld: '',
    yearsWorked: new Date(),
    supervisorName: '',
    supervisorEmailAddress: '',
    photoID: '',
    proofOfIncome: '',
    rentSued: '',
    rentSuedExplanation: '',
    damagesSued: '',
    damagesSuedExplanation: '',
    evicted: '',
    evictedExplanation: '',
    leaseDefault: '',
    leaseDefaultExplanation: '',
    bankruptcy: '',
    bankruptcyExplanation: '',
    felonyConvictions: '',
    felonyConvictionsExplanation: '',
    publicRecords: '',
    publicRecordsExplanation: '',
    desiredMoveInDate: new Date(),
    tenantFirstName: '',
    tenantLastName: '',
    residedFromMonth: '',
    residedFromYear: '',
    residedToMonth: '',
    residedToYear: new Date(),
    monthlyRent: '',
    landlord: '',
    landlordPhoneNumber: '',
    landlordEmail: '',
    reasonForLeaving: '',
    hasCoApplicants: '',
    hasOtherOccupants: '',
    hasPets: '',
    dateOfBirth: '',
    socialSecurityNumber: '',
    governmentID: '',
    issuingState: '',
    hasVehicles: '',
    additionalIncomeSource: '',
    previousAddresses: 
      {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
    
  })

  const [sendContactForm, { isLoading, isError }] =
    useContactApplicationMutation()
  const location = useLocation()

  useEffect(() => {
    const { formData: initialFormData } = location.state || {}

    // Set the initial form data if available
    if (initialFormData) {
      setFormData(initialFormData)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted successfully')
    setIsFormSubmitted(true)
    setTimeout(
      () => {
        setIsFormSubmitted(false)
      },
      5000,
      navigate('/')
    )
    

    if (
      formData.applicationType === 'guarantor' &&
      (!formData.tenantFirstName || !formData.tenantLastName)
    ) {
      alert(
        'Tenant First Name and Last Name are required for guarantor applications.'
      )
      return
    }

    try {
      const result = await sendContactForm(formData)

      if (result.error) {
        console.error('Form submission failed')
      } else {
        console.log('Form submitted successfully')
        // Handle successful form submission
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleCalendarChange = (date, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }))
  }

  return (
    <div className='review-container section-center'>
      <h2>Review and Confirm</h2>
      <h3>Review Your Application Details</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='desiredMoveInDate'>Desired Move In Date *</label>
          <DatePicker
            selected={formData.desiredMoveInDate}
            onChange={(date) => handleCalendarChange(date, 'desiredMoveInDate')}
            dateFormat='MM/dd/yyyy'
            placeholderText='mm/dd/yyyy'
          />
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        {/* Rest of the form fields */}
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='middleName'>Middle Name</label>
          <input
            type='text'
            id='middleName'
            name='middleName'
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='suffix'>Suffix</label>
          <input
            type='text'
            id='suffix'
            name='suffix'
            value={formData.suffix}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmEmail'>Confirm Email</label>
          <input
            type='email'
            id='confirmEmail'
            name='confirmEmail'
            value={formData.confirmEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phoneType'>Phone Type</label>
          <select
            id='phoneType'
            name='phoneType'
            value={formData.phoneType}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='applicationType'>Application Type</label>
          <select
            id='applicationType'
            name='applicationType'
            value={formData.applicationType}
            onChange={handleInputChange}
          >
            <option value=''>Select</option>
            <option value='tenant'>Tenant</option>
            <option value='guarantor'>Guarantor</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='employerName'>Employer Name</label>
          <input
            type='text'
            id='employerName'
            name='employerName'
            value={formData.employerName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address1'>Address 1</label>
          <input
            type='text'
            id='address1'
            name='address1'
            value={formData.address1}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address2'>Address 2</label>
          <input
            type='text'
            id='address2'
            name='address2'
            value={formData.address2}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='state'>State</label>
          <input
            type='text'
            id='state'
            name='state'
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='zip'>ZIP</label>
          <input
            type='text'
            id='zip'
            name='zip'
            value={formData.zip}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            id='country'
            name='country'
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor='employerPhoneNumber'>Employer Phone Number</label>
          <input
            type='text'
            id='employerPhoneNumber'
            name='employerPhoneNumber'
            value={formData.employerPhoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='monthlySalary'>Monthly Salary</label>
          <input
            type='text'
            id='monthlySalary'
            name='monthlySalary'
            value={formData.monthlySalary}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='positionHeld'>Position Held</label>
          <input
            type='text'
            id='positionHeld'
            name='positionHeld'
            value={formData.positionHeld}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='yearsWorked'>Years Worked</label>
          <DatePicker
            selected={formData.yearsWorked}
            onChange={(date) => handleCalendarChange(date, 'yearsWorked')}
            dateFormat='MM/dd/yyyy'
            placeholderText='mm/dd/yyyy'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='supervisorName'>Supervisor Name</label>
          <input
            type='text'
            id='supervisorName'
            name='supervisorName'
            value={formData.supervisorName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='supervisorEmailAddress'>
            Supervisor Email Address
          </label>
          <input
            type='text'
            id='supervisorEmailAddress'
            name='supervisorEmailAddress'
            value={formData.supervisorEmailAddress}
            onChange={handleInputChange}
          />
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

export default ReviewAndConfirm
