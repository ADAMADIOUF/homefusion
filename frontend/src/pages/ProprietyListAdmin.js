import React from 'react'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  useGetPropertiesQuery,
  useDeleteProprietyMutation,
  useCreateProprietyMutation,
} from '../slices/proprietiesApiSlice'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProprietyListAdmin = () => {
  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useGetPropertiesQuery()

  const [createPropriety, { isLoading: loadingCreate }] =
    useCreateProprietyMutation()
  const [deletePropriety, { isLoading: loadingDelete }] =
    useDeleteProprietyMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePropriety(id)
        refetch()
        toast.success('Property deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createProprietyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new property?')) {
      try {
        await createPropriety()
        refetch()
        toast.success('Property created')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <h1>Properties</h1>
      <div className='text-end'>
        <button
          className='btn btn-sm btn-primary m-3'
          onClick={createProprietyHandler}
        >
          <FaEdit /> Create Property
        </button>
      </div>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <>
          <table className='table table-striped table-hover table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Bedrooms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td>{property._id}</td>
                  <td>{property.title}</td>
                  <td>{property.price}</td>
                  <td>{property.type}</td>
                  <td>{property.bedrooms}</td>
                  <td>
                    <Link
                      to={`/admin/property/${property._id}/edit`}
                      className='btn btn-light btn-sm mx-2'
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteHandler(property._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default ProprietyListAdmin
