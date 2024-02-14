import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get(`redirect`) || '/dashboard'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

   const handleSubmit = async (e) => {
     e.preventDefault()

     try {
       const res = await register({ firstName,lastName,propertyAddress, email, password,phoneNumber }).unwrap()
       dispatch(setCredentials({ ...res }))
       navigate(redirect)
       toast.success('Register success')
     } catch (error) {
       console.error(error)
       toast.error('Register failed. Please check your credentials.')
     }
   }

  return (
    <div className='login'>
      <h1>Register</h1>
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              type='text'
              id='phoneNumber'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='propertyAddress'>Property Address</label>
            <input
              type='text'
              id='propertyAddress'
              placeholder='Enter property address'
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='btn-primary btn-block'
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          {isLoading && <Loader />}

          <div className='mt-3'>
            Already have an account?{' '}
            <Link to='/login' className='link'>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
