import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUploadPostImageMutation } from '../slices/proprietiesApiSlice'

const ApplicationAttach = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    photoID: [],
    proofOfIncome: [],
    other: [],
  })
  const navigate = useNavigate()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  const handleFileUpload = (e, fileType) => {
    const files = Array.from(e.target.files)
    setUploadedFiles((prevUploadedFiles) => ({
      ...prevUploadedFiles,
      [fileType]: files,
    }))
  }

  const handleContinue = async () => {
    // Upload files to the backend
    try {
      const formData = new FormData()
      Object.keys(uploadedFiles).forEach((key) => {
        uploadedFiles[key].forEach((file) => {
          formData.append(key, file)
        })
      })

      await uploadProductImage(formData)

      // After successful upload, navigate to the next step
      navigate('/pay-fees')
    } catch (error) {
      console.error('Error uploading files:', error)
      // Handle error (e.g., display error message)
    }
  }

  return (
    <div className='application-attach-container'>
      <h2>Attach Documents</h2>
      <div className='file-upload'>
        <h3>Photo ID</h3>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => handleFileUpload(e, 'photoID')}
        />
      </div>
      <div className='file-upload'>
        <h3>Proof of Income</h3>
        <input
          type='file'
          multiple
          accept='image/*,.pdf'
          onChange={(e) => handleFileUpload(e, 'proofOfIncome')}
        />
      </div>
      <div className='file-upload'>
        <h3>Other</h3>
        <input
          type='file'
          multiple
          onChange={(e) => handleFileUpload(e, 'other')}
        />
      </div>

      {/* Button to continue */}
      <button onClick={handleContinue} className='btn' disabled={loadingUpload}>
        {loadingUpload ? 'Uploading...' : 'Continue'}
      </button>
    </div>
  )
}

export default ApplicationAttach
