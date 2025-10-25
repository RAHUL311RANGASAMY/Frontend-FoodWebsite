import React from 'react'
import { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import AboutUs from './Components/AboutUs/AboutUs'
import TableBook from './Components/TableBook/TableBook'
import Verify from './Pages/verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'


const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  const [tableBook,setTableBook]=useState(false)
  
  

  return (
   <> 
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    {tableBook?<TableBook setTableBook={setTableBook}/>:<></>}

    <div className='app'>
      
      <NavBar setShowLogin={setShowLogin} setTableBook={setTableBook}/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
      </Routes>
    </div>
    
      <Footer />
  </>

  )
}

export default App