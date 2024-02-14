// ApplicationForm.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Apply from './Apply'
import Application from './Application'

const ApplicationForm = () => {
  const [formData, setFormData] = useState({})

  const handleFormData = (data) => {
    setFormData(data)
  }

  const navigate = useNavigate()

  const handleSubmit = () => {
    // Redirect to ReviewAndConfirm.js and pass formData as props
    navigate('/review-and-confirm', { state: { formData } })
  }

  return (
    <div>
      <Apply onFormDataChange={handleFormData} />
      <Application onFormDataChange={handleFormData} />
      <button onClick={handleSubmit}>Review and Confirm</button>
    </div>
  )
}

export default ApplicationForm
