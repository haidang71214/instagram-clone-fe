import React from 'react'
import { useNavigate } from 'react-router'
import { changePassAPI } from '../../utils/fetchFromAPI';
import { toast } from 'react-toastify';
export default function ResetPassWord() {
   const navigate = useNavigate();

   const handleChangePass = (e)=>{
      e.preventDefault();
      const ref_key = document.getElementById('key').value;
      const new_pass = document.getElementById('newpass').value;
      const payload = {expried_code:ref_key,pass_word:new_pass};
      changePassAPI(payload).then((results)=>{
         console.log(payload);
         toast.success('Update Succesfull');
         navigate('/login');
      }).catch((error)=>{
         toast.error('Kiểm tra lại xem sai gì không đi')
      })
   }
  return (
    <div>
      <div>
         <label>Refesh key : </label> <input id='key' placeholder='Press Key'/>
      </div>
      <div>
         <label>New Password : </label> <input id='newpass' placeholder='New Password'/>
      </div>
      <div>
         <button onClick={(e)=>{handleChangePass(e)}} >Change Pass</button>
      </div>
    </div>
  )
}
