import React from 'react'
import { BsGeoAlt } from 'react-icons/bs'
import { MdPhone } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaLock, FaPhoenixFramework, FaYoutube } from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='section-center'>
        <div className='footer-container'>
          <article className='footer-location'>
            <div>
              <span>
                <MdPhone />
              </span>
              <h3>(701) 852-3648 | Main Office, Minot, ND</h3>
            </div>
            <div>
              <span>
                <HiOutlineMail />
              </span>
              <h3>Email Us</h3>
            </div>
            <div>
              <span>
                <BsGeoAlt />
              </span>
              <p>700 N Broadway, Minot, ND 58703, United States</p>
            </div>

            <div>
              <span>
                <MdPhone />
              </span>
              <p>Monday-Friday: 8am-5pm</p>
            </div>

            <div>
              <span>
                <FaPhoenixFramework />
              </span>
              <p>(701) 852-9107</p>
            </div>
          </article>
          <article className='footer-social-2'>
            <div>
              <span>
                <FaYoutube />
              </span>
              <span>
                <FaFacebook />
              </span>
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaLock />
              </span>
            </div>
            <p>
              *All pricing and availability subject to change without notice.
            </p>
            <p>Associations & Affiliations</p>
          </article>
          <article className='portal'>
            <h3>Online Portal</h3>
            <h3>
              <span>Log In </span> |<span>Sign Up</span>
            </h3>
            <h3>Owner Portal</h3>
            <h3>
              <span>Log In </span> |<span>Sign Up</span>
            </h3>
          </article>
        </div>
        <div className='footer-date'>
          <h5>
            &copy;
            {new Date().getFullYear()}
            <span> Adama Diouf </span>
          </h5>
          <h5> All rights reserved</h5>
        </div>
      </div>
    </div>
  )
}

export default Footer
