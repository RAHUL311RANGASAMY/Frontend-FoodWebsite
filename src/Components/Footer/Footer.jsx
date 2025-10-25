import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {


    
    
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'>
                <img src={assets.logo1} alt="" className='logo1'/>
                <p>Your one-step destination for gourmet recipes, fresh ingredients, and culinary inspiration.</p>
                <p className='follow-us'>Follow Us</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
               <h2>COMPANY </h2>
               <ul>
                <Link to='/'>  <li>Home</li> </Link>
                <Link to='/aboutus'><li>About us</li></Link>
                <Link to='/order'>  <li>Delivery</li> </Link>
                <li>Privacy policy</li>
               </ul>

            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+1-9598690974</li>
                    
                    <p>
                    Email:
            <a href="mailto:contact@Gourmet_Eatery.com" style={{ textDecoration: 'none', color: 'blue' }}>
              contact@Gourmet_Eatery.com
            </a>
          </p>
         
                    
                </ul>

            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright © 2024 Gourmet Eatery.com - All Right Reversed.</p>


        
    </div>

  )
}

export default Footer