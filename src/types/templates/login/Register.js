import React, { useState } from 'react'
import style from './styleAdmin.css'
import { detailUser, registerAPI } from '../../../utils/fetchFromAPI';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
export default function Register() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [fullName, setFullName] = useState('');
   const [age, setAge] = useState('')
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // register xong nhớ cập nhật lên chỗ reducer
   const signUphehe = (event)=>{
       event.preventDefault();
      // sau khi lấy ha nhớ set đúng tên
      const payload = {full_name:fullName,email: email,pass_word:password,age:age}
      registerAPI(payload)
      .then((result)=>{
         toast.success(result.message)
         
         navigate('/login')
      })
      .catch((error)=>{
         console.log(error);
         
      })
   }
  return (
   <div className='registerForm'> 
      {/* lưu ý là những tao tác với auth mình kh lưu vô reducer he,
         vì mình lười
      */}
      <div className='hehe'>
      <div className='headerRegis'>Register</div>
      <div className='inputRegis'>
         <div className='huhu'>
         <label>Email</label> <input placeholder='Press email in here ' type="email"value={email}onChange={(e) => setEmail(e.target.value)} /></div>
         <div className='huhu'> <label>Password</label> <input placeholder='Press password in here '  type="password" value={password} onChange={(e) => setPassword(e.target.value)}  /></div>
         <div className='huhu'> <label >Full Name</label><input placeholder='Press full name in here ' type='full_name' value={fullName} onChange={(e)=>setFullName(e.target.value)}/></div>
         <div className='huhu'> <label>Age</label><input placeholder='Press age in here ' type='age' value={age} onChange={(e)=>{setAge(e.target.value)}}/></div>
         <div className='signbutton'><button onClick={(e)=>{signUphehe(e)}} >Sign Up</button></div>
      </div>
      </div>
   </div>
  )
}
