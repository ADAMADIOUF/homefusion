import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
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
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('Login success')
    } catch (error) {
      console.error(error)
      toast.error('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>Email address</label>
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

          <button
            type='submit'
            className='btn-primary btn-block'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {isLoading && <Loader />}
          <div className='mt-3'>
            <Link to='/forgotpassword' className='link'>
              Forgot Password?
            </Link>
          </div>
          <div className='mt-3'>
            Don't have an account?{' '}
            <Link to='/register' className='link'>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
