import React from 'react'
import { useState,useEffect,useContext } from 'react'
import './TableBook.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'

/*
const TableBook = ({setTableBook}) => {

  const {url,setToken}=useContext(StoreContext)

   //backend req
   const [data,setData]=useState({
    days:"",
    time:"",
    name:"",
    phone:"",
    person:""
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data)
  },[data])
//name=' 'onChange={onChangeHandler} value={data. } in inputs so backend req

const ontable=async (event)=>{
  event.preventDefault();
  //install axios packages to use the api from backend
  let newUrl=url;
  
   newUrl+="/api/table/tableBook"
  
 

  const response=await axios.post(newUrl,data);

  if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      //setShowLogin(false)
  }
  else{
   alert(response.data.message)
  }

  }

  return (
    <div className='tableform'>
      <form className='table-container'>
      <h2>Book Your Table now</h2>
      <select defaultValue="Select Day" onChange={onChangeHandler} value={data.days}  >
        <option value="Select Day" disabled>Select Day</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>

      </select>
      <div className='time'>
      <input type='time'  required  onChange={onChangeHandler} value={data.time} ></input>

      <select>
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
      </div>
      
      <input type="text" onChange={onChangeHandler} value={data.name}  placeholder='Full Name' required/>
      <input type="text"  onChange={onChangeHandler} value={data.phone} placeholder='Phone Number' required/>
      <input type='number'  onChange={onChangeHandler} value={data.person} placeholder='How Many Persons?'min={1} />
      <input type="submit" value="BOOK TABLE" />
      <button onClick={()=>setTableBook(false)}>close</button>
      
      
      
      </form>
    </div>
    
  )
}

export default TableBook*/



const TableBook = ({ setTableBook }) => {
  const { url, setToken ,token} = useContext(StoreContext);

  // Backend request data
  const [data, setData] = useState({
    days: "",
    time: "",
    name: "",
    phone: "",
    person: ""
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  /* Debugging state data in console
  useEffect(() => {
    console.log(data);
  }, [data]);*/

  //Submit table booking request
  const onTableBook = async (event) => {
    event.preventDefault();
    
    const newUrl = `${url}/api/table/tableBook`;
    try {
      const response = await axios.post(newUrl, data);
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert('Table booked successfully!');
        setTableBook(false);
        setToken(token)//added
       
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error booking the table:", error);
      alert("Error occurred while booking the table.");
    }
  };

  return (
    <div className='tableform'>
      <form className='table-container' onSubmit={onTableBook}>
        <h2>Book Your Table Now</h2>

        {/* Select Day */}
        <select name="days" onChange={onChangeHandler} value={data.days} required>
          <option value="" disabled>Select Day</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        {/* Time Input */}
        <div className='time'>
          <input type='text' name="time" onChange={onChangeHandler} value={data.time} placeholder='Enter Time' required />
        </div>

        {/* Full Name */}
        <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Full Name' required />

        {/* Phone Number */}
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone Number' required />

        {/* Number of Persons */}
        <input type='number' name="person" onChange={onChangeHandler} value={data.person} placeholder='How Many Persons?' min={1} required />

        {/* Submit */}
        <button type='submit' >BOOK TABLE</button>

        {/* Close Button */}
        <button type="button" onClick={() => setTableBook(false)}>Close</button>
      </form>
    </div>
  );
};

export default TableBook;
