import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetProprietiesByIdQuery,
  useUpdateProprietyMutation,
  useUploadProprietyImageMutation,
} from '../slices/proprietiesApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProprietyAdminEdit = () => {
 const { id: productId } = useParams()
 const [title, setTitle] = useState('')
 const [price, setPrice] = useState(0)
 const [images, setImages] = useState([])

 const [bathrooms, setBathrooms] = useState(0)
 const [bedrooms, setBedrooms] = useState(0)
 const [type, setType] = useState("")
 const [description, setDescription] = useState('')
 const[address,setAddress]=useState("")
 const [featured, setFeatured] = useState(true)

 const {
   data: product,
   isLoading,
   refetch,
   error,
 } = useGetProprietiesByIdQuery(productId)
 const [updateProduct, { isLoading: loadingUpdate }] =
   useUpdateProprietyMutation()
 const [uploadProductImage, { isLoading: loadingUpload }] =
   useUploadProprietyImageMutation()
 const navigate = useNavigate()

 useEffect(() => {
   if (product) {
     setTitle(product.title)
     setPrice(product.price)
     setImages(product.images)
     setBathrooms(product.bathrooms)
     setBedrooms(product.bedrooms)
     setType(product.type)
     setDescription(product.description)
     setAddress(product.address)
     setFeatured(product.featured)

   }
 }, [product])

 const submitHandler = async (e) => {
   e.preventDefault()
   const updatedProduct = {
     productId,
     title,
     price,
     images,
     bathrooms,
     bedrooms,
     type,
     description,
     address,
     featured
   }
   const result = await updateProduct(updatedProduct)
   if (result.error) {
     toast.error(result.error)
   } else {
     toast.success('Product updated')
     navigate('/admin/proprietyList')
   }
 }

 const uploadFileHandler = async (e) => {
   const formData = new FormData()

   // Append each selected file to the formData object
   for (let i = 0; i < Math.min(e.target.files.length, 5); i++) {
     formData.append('images', e.target.files[i])
   }

   try {
     const res = await uploadProductImage(formData).unwrap()
     const uploadedImages = res.images

     // Concatenate the newly uploaded images with the existing ones
     setImages((prevImages) => [...prevImages, ...uploadedImages])

     toast.success(res.message)
   } catch (error) {
     toast.error(error?.data?.message || error.error)
   }
 }

const deleteImageHandler = (index) => {
  // Create a new array of images excluding the one to delete
  const updatedImages = images.filter((_, i) => i !== index)
  setImages(updatedImages)
}

  return (
    <>
      <Link to={`/admin/proprietyList`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <div>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor='name'>Title</label>
              <input
                type='text'
                id='name'
                placeholder='Enter name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                id='price'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='bedrooms'>BedRooms</label>
              <input
                type='number'
                id='bedrooms'
                placeholder='Enter bedrooms'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='bathrooms'>bathrooms</label>
              <input
                type='number'
                id='bathrooms'
                placeholder='Enter bathrooms'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='type'>Type</label>
              <input
                type='text'
                id='typey'
                placeholder='Enter type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                id='description'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='address'>address</label>
              <input
                type='text'
                id='description'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='address'>featured</label>
              <input
                type='text'
                id='featured'
                placeholder='Enter address'
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
              />
            </div>
            <div className='my-2'>
              <label htmlFor='images'>Images</label>
              <input
                type='file'
                id='images'
                multiple // Allow multiple file selection
                onChange={uploadFileHandler}
              />
              {images && images.length > 0 && (
                <div className='mt-2'>
                  {images.map((image, index) => (
                    <div key={index} className='mb-2'>
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='img-thumbnail mr-2'
                        style={{ width: '100px', height: '100px' }}
                      />
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteImageHandler(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type='submit' className='btn btn-primary my-2'>
              Update
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default ProprietyAdminEdit
