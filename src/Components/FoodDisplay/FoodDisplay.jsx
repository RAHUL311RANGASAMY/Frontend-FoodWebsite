import React, { useContext } from 'react'
import './FoodDisplay.css'

import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'



const FoodDisplay = ({category}) => {
//use the global store by usecontect()hooks and pass {value}
    const {food_list}=useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">

            {/*create the componets FoodItem*/}
            {/* food item  */}
            {food_list.map((item,index)=>{
             //when particular category in exploreMenu list thet same items or print all category 
             if(category==="All" || category===item.category)
             {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
             }  
            })}
        </div>

    </div>
  )
}

export default FoodDisplay