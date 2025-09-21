import React from 'react'
import { useNavigate } from 'react-router'
import { forgotPasswordAPI } from '../../utils/fetchFromAPI'
import { toast } from 'react-toastify'

export default function ForgotPass() {
   // lấy mail
   const navigate = useNavigate()
   const handDleSendRef = (e) =>{
      e.preventDefault();
      const inputEmail = document.getElementById('mail').value;
      const payload = {email: inputEmail}
      forgotPasswordAPI(payload)
      .then((result)=>{
         console.log(result);
         toast.success(`Check mail ${payload.email} bé ơi`);
         navigate('/changepass');
      })
      .catch((error)=>{
         console.log(error);
         
      })
   }
  


  return (
   <div>
    <div className='forgotee'>
      <div>Nhập cái mail vào nào bé: </div>
      <input id='mail' placeholder='Nhập zô đây'/>
      <button className='op' onClick={(e)=>{handDleSendRef(e)}}>Send Token</button>
    </div>
    </div>
  )
}
