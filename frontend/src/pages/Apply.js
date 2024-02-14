import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGetProprietiesByIdQuery } from '../slices/proprietiesApiSlice'
import { useContactApplicationMutation } from '../slices/contactApiSlice'

const Apply = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [sendContactForm, { isError, isLoading: loadingContact }] =
    useContactApplicationMutation()

  const { id: productId } = useParams()

  const {
    data: product,
    isLoading,
    error,
  } = useGetProprietiesByIdQuery(productId)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    desiredMoveInDate: new Date(),
    applicationType: '',
    tenantFirstName: '',
    tenantLastName: '',
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isGuarantorSelected, setIsGuarantorSelected] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the application type is guarantor and if the tenant first and last names are blank
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
        setIsFormSubmitted(true)

        // Set a timeout to reset the isFormSubmitted state after 5 seconds
        setTimeout(() => {
          setIsFormSubmitted(false)
        }, 5000)

        // Clear the form fields after successful submission
        setFormData({
          desiredMoveInDate: new Date(),
          applicationType: '',
          tenantFirstName: '',
          tenantLastName: '',
        })

        // Redirect to Rental Application page after successful submission
       
      }
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

  

  const handleGuarantorClick = () => {
    // Toggle the isGuarantorSelected state
    setIsGuarantorSelected(!isGuarantorSelected)
  }
const handleNext = () => {
  // Navigate to the next page with the form data as state
  navigate('/rental-application', { state: { formData } })
}
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!product) {
    return <div>No data found for the given ID.</div>
  }

  return (
    <div className='apply-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>
        <strong>(701) 852-3648</strong>
      </p>
      <p>
        <strong>Before You Begin:</strong>
        Please be prepared to pay the application fee as outlined in the
        property listing. In addition to this rental application, you will also
        be required to provide a copy of a valid form of identification and
        proof of income.
      </p>
      <p>
        To complete this rental application, you must be prepared to provide
        three (3) years of residential history as well as contact information
        for your rental references. You will also be asked to provide
        information on your monthly income, and please note that most properties
        require that applicant combined gross income is at least three (3) times
        the monthly rent amount.
      </p>
      <p>
        Each resident over the age of 18 must submit a separate rental
        application.
      </p>
      <p>
        Security deposit will NOT be refunded if prospective tenant fails to
        execute the lease on this premises. This application is considered a
        part of your lease. Any false or misleading information given on this
        application shall be construed as a breach of the lease, and grounds for
        immediate eviction. I certify that the foregoing information is true and
        correct in all respects, and I authorize verification of all tenant
        history, income, criminal background check, and credit check. I also
        fully understand that this application is taken subject to the approval
        of IMM Management and property owners. I certify that no pets will be
        kept on the premises, unless authorized by IMM.
      </p>
      <p>Application Fee: $55.00</p>
      <p>
        You are applying to rent:
        {product.address}
      </p>
      <p>Desired Move-in: {product.moveInDate}</p>
      <label htmlFor='desiredMoveInDate'>Desired Move In Date *</label>
      <DatePicker
        selected={formData.desiredMoveInDate}
        onChange={(date) => handleCalendarChange(date, 'desiredMoveInDate')}
        dateFormat='MM/dd/yyyy'
        placeholderText='mm/dd/yyyy'
      />
      <div>
        <input
          type='radio'
          id='tenant'
          name='applicationType'
          value='tenant'
          checked={formData.applicationType === 'tenant'}
          onChange={() =>
            setFormData({
              ...formData,
              applicationType: 'tenant',
              tenantFirstName: '',
              tenantLastName: '',
            })
          }
        />
        <label htmlFor='tenant'>
          I am applying as a tenant. (I will be living on the property.)
        </label>
      </div>
      <div>
        <input
          type='radio'
          id='guarantor'
          name='applicationType'
          value='guarantor'
          checked={formData.applicationType === 'guarantor'}
          onChange={() => {
            setFormData({
              ...formData,
              applicationType: 'guarantor',
              tenantFirstName: '',
              tenantLastName: '',
            })
            handleGuarantorClick() // Toggle the visibility of Tenant First Name and Tenant Last Name inputs
          }}
        />
        <label htmlFor='guarantor'>
          I am applying as a guarantor/co-signer for another applicant. (I will
          not be living on the property.)
        </label>
      </div>

      {isGuarantorSelected && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='tenantFirstName'>Tenant First Name *</label>
              <input
                type='text'
                id='tenantFirstName'
                name='tenantFirstName'
                value={formData.tenantFirstName}
                onChange={(e) =>
                  setFormData({ ...formData, tenantFirstName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor='tenantLastName'>Tenant Last Name *</label>
              <input
                type='text'
                id='tenantLastName'
                name='tenantLastName'
                value={formData.tenantLastName}
                onChange={(e) =>
                  setFormData({ ...formData, tenantLastName: e.target.value })
                }
              />
            </div>
          </form>
        </>
      )}

      <button onClick={handleNext} isabled={isFormSubmitted}
        className='btn'>Next
      </button>
    </div>
  )
}

export default Apply
