import React from 'react'
import './Header.css'
import { Link } from 'react-scroll'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.Our mission is to statisfy your craving and elevate your dining experiences,one delicious at a time</p>
            <Link to="food-display" spy={true} smooth={true} offset={-100} duration={500}><button >View Menu</button></Link>
            

           
        </div>
    </div>
  )
}

export default Header