import { createContext, useEffect } from "react";
import { useState } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";//admin foodlist 

//global store 
export const StoreContext=createContext(null)
//set value food list 
const StoreContextProvider =(props)=>{
    //cart function - +
   const [cartItems,setCartItems]=useState([]);
   const url="http://localhost:4000"
   const [token,setToken]=useState("") //after sign
   const [food_list,setFoodList]=useState([])   //admin foodlist ->not in assets folder ->call the list from admin so use api

   const addToCart=async(itemId)=>{
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }
      else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
      //this api add the add item to userid in db item 
      if(token){
     
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
      }
   }

   const removeFromCart=async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
   }

   //cart total
    /*
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
      let itemInfo = food_list.find((product)=>product._id === item);
      totalAmount += itemInfo.price * cartItems[item];
      }
    }
    console.log("Total Cart Amount: ", totalAmount);
    return totalAmount;
    
  }*/

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          if (itemInfo) {  // Check if itemInfo exists
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
      }
      console.log("Total Cart Amount: ", totalAmount);
      return totalAmount;
    }
    
  
 
 

//backend may use cart add remove 
   useEffect(()=>{
      console.log(cartItems)
   },[cartItems])


    
   /*after sign in relod useeffect no logout setlogin true ->token state has{}->reload->set token (token)
   useEffect(()=>{
       if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    }
   },[])*/
   //foodlist ->not in assets folder ->call the list from admin so use api
   
   const fetchFoodList=async()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

   useEffect(()=>{
   
    async function loadData(){
      await fetchFoodList();

       if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"));
    }
    }
    loadData();
   },[])
  

  const loadCartData=async (token)=>{
    const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
  }
   
    //fun to pass obj put pass provider
    const contextValue={
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
}


    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;