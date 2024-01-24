import React from 'react'
import { FaHouseDamage } from 'react-icons/fa'
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <div className='header'>
      <div className='header-img'>
        <div className='header-content'>
          <h2>welcome home</h2>
        </div>
        <div className='search-proprieties'>
          <div>
            <Link to={`/properties`}>
              <span className='icon-house'>
                <FaHouseDamage />
              </span>
            </Link>
          </div>
          <div>
            <Link to={`/properties`}>
              <span>
                <input type='text' placeholder='search All Properties' />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
