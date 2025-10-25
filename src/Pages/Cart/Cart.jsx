import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { Link } from 'react-router-dom'

const Cart = () => {
//destructure
  const {cartItems,food_list,removeFromCart, getTotalCartAmount,url}=useContext(StoreContext)
  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
            {
            return(
              <div key={item._id || index}>
              <div className='cart-items-title cart-items-item'>
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
              </div> 
              <hr />
              </div>

            )
          }
          })}
      </div>
      <div className="cart-bottom">
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
          <Link to='/order'><button>PROCEED TO CHECKOUT</button></Link>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If You have a promo code,Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promocode' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        
      </div>
      </div>
  )
}

export default Cart