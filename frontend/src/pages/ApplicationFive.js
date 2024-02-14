import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApplicationFive = () => {
  const [formData, setFormData] = useState({
    currentEmployer: {
      employerName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      employerPhoneNumber: '',
      monthlySalary: '',
      positionHeld: '',
      yearsWorked: '',
      supervisorName: '',
      supervisorEmailAddress: '',
    },
    additionalIncomeSource: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('currentEmployer')) {
      const field = name.split('.')[1]
      setFormData((prevFormData) => ({
        ...prevFormData,
        currentEmployer: {
          ...prevFormData.currentEmployer,
          [field]: value,
        },
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleContinue = () => {
    // Here you can handle form submission or validation
    // and then navigate to the next step of the application process
    navigate('/attach-documents', { state: { formData } })
  }

  return (
    <div className='application-container section-center'>
      <h2>Rental Application</h2>
      <h3>Investors Management & Marketing Inc.</h3>
      <p>(701) 852-3648</p>

      <h3>Your Income</h3>

      <h4>CURRENT EMPLOYER</h4>
      <div className='form-group'>
        <label htmlFor='employerName'>Employer Name</label>
        <input
          type='text'
          id='employerName'
          name='currentEmployer.employerName'
          value={formData.currentEmployer.employerName}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='address1'>Address 1</label>
        <input
          type='text'
          id='address1'
          name='currentEmployer.address1'
          value={formData.currentEmployer.address1}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='address2'>Address 2</label>
        <input
          type='text'
          id='address2'
          name='currentEmployer.address2'
          value={formData.currentEmployer.address2}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          name='currentEmployer.city'
          value={formData.currentEmployer.city}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='state'>State</label>
        <input
          type='text'
          id='state'
          name='currentEmployer.state'
          value={formData.currentEmployer.state}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='zip'>ZIP</label>
        <input
          type='text'
          id='zip'
          name='currentEmployer.zip'
          value={formData.currentEmployer.zip}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='employerPhoneNumber'>Employer Phone Number</label>
        <input
          type='text'
          id='employerPhoneNumber'
          name='currentEmployer.employerPhoneNumber'
          value={formData.currentEmployer.employerPhoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='monthlySalary'>Monthly Salary</label>
        <input
          type='text'
          id='monthlySalary'
          name='currentEmployer.monthlySalary'
          value={formData.currentEmployer.monthlySalary}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='positionHeld'>Position Held</label>
        <input
          type='text'
          id='positionHeld'
          name='currentEmployer.positionHeld'
          value={formData.currentEmployer.positionHeld}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='yearsWorked'>Years Worked</label>
        <input
          type='text'
          id='yearsWorked'
          name='currentEmployer.yearsWorked'
          value={formData.currentEmployer.yearsWorked}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='supervisorName'>Supervisor Name</label>
        <input
          type='text'
          id='supervisorName'
          name='currentEmployer.supervisorName'
          value={formData.currentEmployer.supervisorName}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='supervisorEmailAddress'>Supervisor Email Address</label>
        <input
          type='email'
          id='supervisorEmailAddress'
          name='currentEmployer.supervisorEmailAddress'
          value={formData.currentEmployer.supervisorEmailAddress}
          onChange={handleChange}
        />
      </div>

      <h4>ADDITIONAL INCOME SOURCE</h4>
      <div className='form-group'>
        <label htmlFor='additionalIncomeSource'>Additional Income Source</label>
        <input
          type='text'
          id='additionalIncomeSource'
          name='additionalIncomeSource'
          value={formData.additionalIncomeSource}
          onChange={handleChange}
        />
      </div>

     
      <button onClick={handleContinue}className='btn'>Continue</button>
    </div>
  )
}

export default ApplicationFive
