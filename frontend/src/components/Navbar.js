import React, { useState } from 'react'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import { AiFillCar, AiFillHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const userInfo = useSelector((state) => state.auth.userInfo)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleItemClick = () => {
    setMenuOpen(false)
  }

  const scrollToTop = () => {
    scroll.scrollToTop()
  }
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
    <nav className='navbar'>
      <div className='nav-header'>
        <RouterLink
          to='/'
          onClick={() => {
            scrollToTop()
            handleItemClick()
          }}
        >
          <div className='logo'>
            <h3>
              <span className='logo-icon'>
                HOMEFUSION <AiFillHome />
              </span>
            </h3>
          </div>
        </RouterLink>

        <div className='menu-icon' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li className='nav-item'>
            <RouterLink
              to='/'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/' ? 'active-link' : ''}
            >
              Home
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/about'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/about' ? 'active-link' : ''}
            >
              About
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/maintenance'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/services' ? 'active-link' : ''}
            >
              Maintenance Request
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/contact'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/contact' ? 'active-link' : ''}
            >
              Contact
            </RouterLink>
          </li>
          {userInfo ? (
            <>
              <li className='nav-item'>
                <RouterLink
                  to='/profile'
                  onClick={() => {
                    scrollToTop()
                    handleItemClick()
                  }}
                  className={
                    location.pathname === '/profile' ? 'active-link' : ''
                  }
                >
                  Profile
                </RouterLink>
              </li>
              <li className='nav-item'>
                <RouterLink
                  to='/payment'
                  onClick={() => {
                    scrollToTop()
                    handleItemClick()
                  }}
                  className={
                    location.pathname === '/payment' ? 'active-link' : ''
                  }
                >
                  Payment
                </RouterLink>
              </li>
              <li className='nav-item' onClick={logoutHandler}>
                Logout
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <RouterLink
                to='/login'
                onClick={() => {
                  scrollToTop()
                  handleItemClick()
                }}
                className={location.pathname === '/login' ? 'active-link' : ''}
              >
                Login
              </RouterLink>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className='admin-dropdown'>
              <button
                className='dropdown-toggle'
                onClick={() => {
                  scrollToTop()
                  handleItemClick()
                }}
              >
                Admin
              </button>
              <ul className='dropdown-menu' id='adminmenu'>
                <li className='nav-item'>
                  <RouterLink
                    to='/admin/proprietyList'
                    className='dropdown-item'
                    onClick={() => {
                      scrollToTop()
                      handleItemClick()
                    }}
                  >
                    PropertyList
                  </RouterLink>
                </li>
                <li className='nav-item'>
                  <RouterLink
                    to='/admin/orderList'
                    className='dropdown-item'
                    onClick={() => {
                      scrollToTop()
                      handleItemClick()
                    }}
                  >
                    Orders
                  </RouterLink>
                </li>
                <li className='nav-item'>
                  <RouterLink
                    to='/admin/userList'
                    className='dropdown-item'
                    onClick={() => {
                      scrollToTop()
                      handleItemClick()
                    }}
                  >
                    Users
                  </RouterLink>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
