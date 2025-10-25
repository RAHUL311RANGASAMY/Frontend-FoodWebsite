import React, { useContext } from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)

      const [currState,setCurrState]=useState("Login")
      //backend req
      const [data,setData]=useState({
        name:"",
        email:"",
        password:""
      })

      const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
      }

     // useEffect(()=>{
       // console.log(data)
      //},[data])
//name=' 'onChange={onChangeHandler} value={data. } in inputs so backend req

     const onLogin=async (event)=>{
     event.preventDefault();
     //install axios packages to use the api from backend
     let newUrl=url;
     if(currState==="Login"){
      newUrl+="/api/user/login"
     }
     else{
      newUrl+="/api/user/register"
     } 

     const response=await axios.post(newUrl,data);

     if(response.data.success){
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token);
         setShowLogin(false)
     }
     else{
      alert(response.data.message)
     }

     }
  return (
    <div className='login-popup'>
     <form onSubmit={onLogin} className="login-popup-container">
       <div className="login-popup-title">
        <h2>{currState}</h2>
        {/*when the --cross" btn click the --setshowstate make false in --app.jsx */}
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
       
       </div>
       <div className="login-popup-inputs">
        {/* iff login no name*/}
        {currState==="Login"?<></>:<input name='name' type='text' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
        <input name='email'onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required />
        <input name='password' onChange={onChangeHandler} value={data.password}  type='password' placeholder='Your Password' required />
       </div>

       {/*signup-createaccount or login */}
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>

       <div className="login-popup-conditions">
          <input type='checkbox' required />
          <p>By continuing,I agree the terms of use and Privacy Policy</p>
       </div>

       {currState==="Login"?
       <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
       <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}

     </form>
    </div>
  )
}

export default LoginPopup