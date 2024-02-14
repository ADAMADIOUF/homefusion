import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { MdSettings } from 'react-icons/md'
import { RiLoginCircleLine } from 'react-icons/ri'
import { BsCalendarCheck } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const Tenant = () => {
  return (
    <div className='tenant'>
      <div className='title'>
        <h3>For Tenants</h3>
      </div>
      <div className='tenants-container'>
        <article>
          <span>
            <Link to={'/login'}>
              <RiMoneyDollarCircleFill />
            </Link>
          </span>
          <h3>Pay Rent Online</h3>
        </article>
        <article>
          <span>
            <Link to={'/login'}>
              <MdSettings />
            </Link>
          </span>
          <h3>Maintenance Request</h3>
        </article>
        <article>
          <span>
            <Link to={'/login'}>
              <RiLoginCircleLine />
            </Link>
          </span>
          <h3>Login</h3>
        </article>
        <article>
          <span>
            <Link to={`/properties`}>
              {' '}
              <BsCalendarCheck />
            </Link>
          </span>
          <h3>Check Availability</h3>
        </article>
      </div>
    </div>
  )
}

export default Tenant
