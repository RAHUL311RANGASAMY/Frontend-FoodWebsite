import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import {Link as ScrollLink} from 'react-scroll';
import { MdOutlineTableRestaurant } from "react-icons/md";
import { ThemeContext } from '../ThemeProvider/ThemeProvider'//add
import { MdDarkMode } from "react-icons/md";



const NavBar = ({setShowLogin,setTableBook}) => {

     const [menu,setMenu]=useState("home");
     const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
     const { theme, toggleTheme } = useContext(ThemeContext);//add
     
     //if user logout the page return to home page so use navgate
     //when we reload the page after sigin in the account not logout in -> useeffect in after sign, load storecontext
     const navigate=useNavigate();

     const logout=()=>{
          localStorage.removeItem("token")
          setToken("");
          navigate("/")
     }
    
  
   //referesh to top
  useEffect(() => {
    // Ensure the page scrolls to the top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='navbar'>
    <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
      <Link to='/'> <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li></Link>
      
       
       <ScrollLink to="explore-menu " spy={true} smooth={true} offset={-100} duration={500}> <li   onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li></ScrollLink>

      

       <ScrollLink to="app-download" spy={true} smooth={true} offset={-100} duration={1000}> <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li></ScrollLink>
       <Link to='/aboutus'> <li onClick={()=>setMenu("aboutus")} className={menu==="aboutus"?"active":""}>about</li></Link>
        <ScrollLink to="footer" spy={true} smooth={true} offset={-100} duration={1000}>  <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li></ScrollLink>

          
    
      
      
      </ul>

      

      
      <div className="navbar-right">
       {/*<img src={assets.search_icon} alt="" />*/}
        <div className="navbar-search-icon">
          {/*path link imp routes cart /cart to img */}
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()>0 ?"dot":""}></div>
            
           
            
        </div>
        <div><p className="theme-toggle" onClick={toggleTheme} ><MdDarkMode size={25}/></p></div>

        
        
        {/*login after profile token true profile  localstorage from loginpopup
         <button onClick={()=>{setShowLogin(true)}}>sign in</button> usestate for after login true make token as popup and logout settoken false in navbar 2 diff state below*/}
          
        {!token?
        <button onClick={()=>{setShowLogin(true)}}>sign in</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" className='profile'/>
          <ul className='nav-profile-dropdown'>
          <Link to="/myorders"><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          <hr />
          <li onClick={()=>setTableBook(true)}><MdOutlineTableRestaurant size={25} color='tomato'/><p>Table Reservation  </p></li>
          </ul>
         
          <hr/>
          
    </div>}
    </div>
     
    </div>
  )
}


export default NavBar