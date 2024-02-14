import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
const[propertyAddress,setPropertyAddress]=useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()
   

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setPhoneNumber(userInfo.phoneNumber)
      setPropertyAddress(userInfo.propertyAddress)
      setEmail(userInfo.email)
    }
  }, [userInfo.firstName, userInfo.email, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
  
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstName,
          lastName,
          phoneNumber,
          propertyAddress,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile updated successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    
  }

  return (
    <div className='profile-screen section-center'>
      <div className='profile-section'>
        <h2>User Profile</h2>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Last Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Phone Number</label>
            <input
              type='number'
              id='name'
              placeholder='Enter PhoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Address </label>
            <input
              type='text'
              id='name'
              placeholder='Enter address'
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='btn-primary'>
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      <div className='payment-section'>
       
      </div>
    </div>
  )
}

export default ProfileScreen
