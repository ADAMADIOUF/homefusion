import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApplicationQuestions = () => {
  const [formData, setFormData] = useState({
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
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleContinue = () => {
    // Here you can handle form submission or validation
    // and then navigate to the next step of the application process
    navigate('/review-confirm', { state: { formData } })
  }

  return (
    <div className='application-questions-container section-center'>
      <h2>Questions</h2>
      <div className='question'>
        <label htmlFor='rentSued'>Have you ever been sued for rent?</label>
        <select
          id='rentSued'
          name='rentSued'
          value={formData.rentSued}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.rentSued === 'Yes' && (
          <textarea
            name='rentSuedExplanation'
            value={formData.rentSuedExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='damagesSued'>
          Have you ever been sued for damages?
        </label>
        <select
          id='damagesSued'
          name='damagesSued'
          value={formData.damagesSued}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.damagesSued === 'Yes' && (
          <textarea
            name='damagesSuedExplanation'
            value={formData.damagesSuedExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='evicted'>Have you ever been evicted?</label>
        <select
          id='evicted'
          name='evicted'
          value={formData.evicted}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.evicted === 'Yes' && (
          <textarea
            name='evictedExplanation'
            value={formData.evictedExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='leaseDefault'>
          Have you ever defaulted on a lease?
        </label>
        <select
          id='leaseDefault'
          name='leaseDefault'
          value={formData.leaseDefault}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.leaseDefault === 'Yes' && (
          <textarea
            name='leaseDefaultExplanation'
            value={formData.leaseDefaultExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='bankruptcy'>
          Have you filed for bankruptcy in the last three (3) years?
        </label>
        <select
          id='bankruptcy'
          name='bankruptcy'
          value={formData.bankruptcy}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.bankruptcy === 'Yes' && (
          <textarea
            name='bankruptcyExplanation'
            value={formData.bankruptcyExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='felonyConvictions'>
          Have you ever had any felony convictions?
        </label>
        <select
          id='felonyConvictions'
          name='felonyConvictions'
          value={formData.felonyConvictions}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.felonyConvictions === 'Yes' && (
          <textarea
            name='felonyConvictionsExplanation'
            value={formData.felonyConvictionsExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      <div className='question'>
        <label htmlFor='publicRecords'>
          Have you ever had any public record audits, liens, repossessions, or
          judgments against you?
        </label>
        <select
          id='publicRecords'
          name='publicRecords'
          value={formData.publicRecords}
          onChange={handleChange}
        >
          <option value=''>Select one</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
        {formData.publicRecords === 'Yes' && (
          <textarea
            name='publicRecordsExplanation'
            value={formData.publicRecordsExplanation}
            onChange={handleChange}
            placeholder='Please explain'
          />
        )}
      </div>

      {/* Button to continue */}
      <button onClick={handleContinue}className='btn'>Continue</button>
    </div>
  )
}

export default ApplicationQuestions
