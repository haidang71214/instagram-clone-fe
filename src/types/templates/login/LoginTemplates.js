   import React, { useState } from 'react'
   import style from './styleAdmin.css'
   import { loginAsyncKeyAPI, loginFaceBook } from '../../../utils/fetchFromAPI';
   import { toast } from 'react-toastify';
   import { useNavigate } from 'react-router-dom';
   import { useDispatch } from 'react-redux';
   import { fetchdetailUser } from '../../../redux/Action/UserDetailAction';
   import ReactFacebookLogin from 'react-facebook-login';

   export default function LoginTemplates() {
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const signInHehe = (e) => {
         e.preventDefault();
         const email = document.getElementById('email').value;
         const pass_word = document.getElementById('pass').value;
         const payload = {email, pass_word};
         
         loginAsyncKeyAPI(payload)
            .then((results) => {
               console.log("Payload:", payload);
               console.log("API Results:", results);
               if (results.accessToken && results.user_id) {
                  // Lưu dữ liệu vào localStorage
                  localStorage.setItem('LOGIN_USER', results.accessToken);
                  localStorage.setItem('user_id', results.user_id);
                  const user_id = localStorage.getItem('user_id')
                  dispatch(fetchdetailUser(user_id))
                  // Chuyển hướng sau khi đăng nhập thành công
                  navigate('/');
               } else {
                  toast.error('Dữ liệu đăng nhập không hợp lệ!');
               }
            })
            .catch((error) => {
               toast.error('Check lại đi');
               console.log(error);
            });
      };
      
      return (
         <div className='registerForm'> 
            <div className='hehe'>
            <div className='headerRegis'>Login</div>
            <div className='inputRegis'>
               <div className='huhu' ><label>Email</label> <input placeholder='Press email in here ' id='email'/></div>
               <div className='huhu'> <label>Password</label> <input placeholder='Press password in here ' type='password' id='pass'/></div>
               <div style={{display:'flex'}}>
               <div className='signbutton'><button onClick={(e)=>{signInHehe(e)}}>Sign In</button></div>
               <div>
                  
                  <ReactFacebookLogin
                     appId="1563092610972708"
                     fields="name,email,picture"
                     callback={(response) => {
                        let { id, name, email } = response;
                        // này nó lấy id name với email
                        const newUser = { id, email, name }; // Tạo object cho user
                        loginFaceBook(newUser)
                           .then((result) => {
                              toast.success(result.message);
                              localStorage.setItem("LOGIN_USER", result.data);
                              console.log(result.data.user.user_id);
                              // chỗ này có chút vấn đề
                              localStorage.setItem('user_id',result.data.user.user_id)
                              navigate("/");
                           })
                           .catch((error) => {
                              toast.error(error.response.data.message);
                           });
                     }}
               />
               
               
               </div>
               <div className='signbutton' onClick={()=>{navigate('/forgotpass')}}><button>Forgot Password</button></div>
               </div>
            </div>
            </div>
         </div>
      )
   }
