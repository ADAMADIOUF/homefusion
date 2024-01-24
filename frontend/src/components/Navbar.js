import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../slices/toggleSlice'
import { FaBars } from 'react-icons/fa' 
import { FaTimes } from 'react-icons/fa'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
const Navbar = () => {
  const isMenuOpen = useSelector((state) => state.toggle.isMenuOpen)
  const dispatch = useDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggleMenu = () => {
    dispatch(toggleMenu())
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav>
      <div className='logo'>
        <Link to={`/`}>
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li className='dropdown' onClick={handleToggleDropdown}>
            Available Units
            {isDropdownOpen && (
              <ul className='dropdown-content'>
                <li>Minot</li>
                <li>Bismark</li>
                <li>Fargo</li>
              </ul>
            )}
          </li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className='hamburger' onClick={handleToggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  )
}

export default Navbar
