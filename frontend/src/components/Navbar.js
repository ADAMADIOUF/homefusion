import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../slices/toggleSlice'
import { FaBars, FaUser } from 'react-icons/fa' 
import { FaTimes } from 'react-icons/fa'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'

import { useLogoutMutation } from '../slices/usersApiSlice'
const Navbar = () => {
  const isMenuOpen = useSelector((state) => state.toggle.isMenuOpen)
  const handleToggleMenu = () => {
    dispatch(toggleMenu())
  }
const navigate = useNavigate()
const dispatch = useDispatch()
const { userInfo } = useSelector((state) => state.auth)
const [logoutApiCall] = useLogoutMutation()
const logoutHandler = async () => {
  try {
    await logoutApiCall().unwrap()
    dispatch(logout())
    navigate(`/login`)
  } catch (error) {
    console.log(error)
  }
}
  

  return (
    <nav>
      <div className='logo'>
        <Link to={`/`}>
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <ul>
        <li>About</li>
        <li>
          <Link to={`/contact`}>Contact</Link>
        </li>
        <li>
          <Link to={`/properties`}>Properties</Link>
        </li>
      </ul>
      <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
        {userInfo ? (
          <div className='navbar__dropdown'>
            <div className='navbar__username'>{userInfo?.firstName}</div>
            <ul className='navbar__dropdown-menu'>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/payment'>Payment</Link>
              </li>
              <li>
                <Link to='/maintenance'>MaintenanceRequest</Link>
              </li>
              <li onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
        ) : (
          <Link to='/login' className='navbar__sign-in'>
            <FaUser /> Sign In
          </Link>
        )}
      </div>

      {userInfo && userInfo.isAdmin && (
        <div className='admin-dropdown'>
          <button className='dropdown-toggle'>Admin</button>
          <ul className='dropdown-menu' id='adminmenu'>
            <li>
              <Link to='/admin/proprietyList' className='dropdown-item'>
                ProprietyList
              </Link>
            </li>
            <li>
              <Link to='/admin/orderlist' className='dropdown-item'>
                Orders
              </Link>
            </li>
            <li>
              <Link to='/admin/userlist' className='dropdown-item'>
                Users
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className='hamburger' onClick={handleToggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  )
}

export default Navbar
