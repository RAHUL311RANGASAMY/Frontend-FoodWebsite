/*import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
    const [data,setData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    })

    const onChangehandler=(event)=>{
      const {name,value}=event.target;
      setData(data=>({...data,[name]:value}))
    }
    
   // useEffect(()=>{
     // console.log(data)
    // },[data]);
  
    //const navigate=useNavigate();
    const placeOrder=async(event)=>{
       event.preventDefault();
       let orderItems=[];
       food_list.map((item)=>{
         if(cartItems[item._id]>0){
          let itemInfo=item;
          itemInfo["quantity"]=cartItems[item._id];
          orderItems.push(itemInfo)
         }

       })
       //console.log(orderItems);
       let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+40,
       }
       
       let response =await axios.post(url+"/api/order/place",orderData,{headers:{token}});//backend ordercontroller
       if(response.data.success){
           const {session_url}=response.data;
           window.location.replace(session_url);
          // navigate("/");

       }
       else{
        alert("error");
       }

  
    }
    const navigate=useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(getTotalCartAmount()===0){
        navigate('/cart')
      }
    },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
         <p className='title'>Delivery Information</p>
         <div className="multi-fields" >
          <input required name='firstName' onChange={onChangehandler} value={data.firstName}    placeholder='First name' />
          <input required name='lastName' onChange={onChangehandler} value={data.lastName} placeholder='Second name' />
         </div>
         <input  required name='email' onChange={onChangehandler} value={data.email} placeholder='Email address' />
         <input required name='street' onChange={onChangehandler} value={data.street} placeholder='Street' />
      
        <div className="multi-fields">
          <input required name='city' onChange={onChangehandler} value={data.city} placeholder='city'/>
          <input required name='state' onChange={onChangehandler} value={data.state} placeholder='state' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} placeholder='Zip code' />
          <input required name='country' onChange={onChangehandler} value={data.country} placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangehandler} value={data.phone} placeholder='Phone'/>
      </div>

        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${ getTotalCartAmount()}</p>

              </div>
              <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${40}</p>
            </div>
            <hr />
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${ getTotalCartAmount()+40}</b>
            </div>
            <p className='pm'>Payment mode</p>
            <button type='submit'>COC(cash on delivery)</button>
            <button type='submit'>STRIPE PAYMENT</button>
            </div>
      </div>
    </form>
  )
}

export default PlaceOrder*/  




import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangehandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  const handleOrderPlacement = async (paymentMode) => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40, // Add delivery fee
      paymentMode, // Pass the payment mode (COD or Stripe)
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      if (response.data.success) {
        if (paymentMode === "stripe") {
          // Redirect to Stripe checkout
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          // COD success
          alert("Order placed successfully with Cash on Delivery!");
          navigate("/myorders");
        }
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={(e) => e.preventDefault()}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangehandler}
            value={data.firstName}
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangehandler}
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangehandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangehandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangehandler}
            value={data.city}
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangehandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangehandler}
            value={data.zipcode}
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangehandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangehandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${40}</p>
            </div>
            <hr />
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() + 40}</b>
          </div>
          <p className="pm">Payment mode</p>
          <button
            type="button"
            onClick={() => handleOrderPlacement("cod")}
          >
            Cash on Delivery
          </button>
          <button
            type="button"
            onClick={() => handleOrderPlacement("stripe")}
          >
            Stripe Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
