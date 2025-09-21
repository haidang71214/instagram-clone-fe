import React, { useRef } from 'react';
import { updateUserAPI } from '../../utils/fetchFromAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchdetailUser } from '../../redux/Action/UserDetailAction';

export default function UpdateUser() {
   // kê, hiểu vấn đề r =))
   const user_id = localStorage.getItem('user_id');
   const fileInputRef = useRef(null);
   const navigate =  useNavigate(); 
   const dispatch = useDispatch()
   const handLesubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const newName = document.getElementById('new_name').value;
      const newPass = document.getElementById('new_pass').value;
      const newAge = document.getElementById('new_age').value;
      const file = fileInputRef.current.files[0];

      // Thêm các trường chỉ khi có giá trị
      if (file) formData.append('avatainsta', file);
      if (newName) formData.append('new_name', newName);
      if (newPass) formData.append('new_pass', newPass);
      if (newAge) formData.append('new_age', newAge);

      

      // Nếu không có gì thay đổi, không cần gửi formData
      if (formData.has('avatainsta') || formData.has('new_name') || formData.has('new_pass') || formData.has('new_age')) {
         try {
            // update ở đây, xíu đổi xong đổi cái trong reducer là được, kh cần gọi api

            const result = await updateUserAPI(user_id, formData);
            dispatch(fetchdetailUser(user_id))
            // dispatch tự update trong reducer
            toast.success(result.message);
            
            navigate('/');
          } catch (error) {
            console.log("Có lỗi xảy ra:", error);
          }
      } else {
         toast.warning("Không có dữ liệu nào để cập nhật.");
      }
   };

   return (
      <div className='registerForm'>
         <form className='inputRegis ppo' onSubmit={handLesubmit}>
         <div className='bea'>
         <div className='huhu'>  
            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => console.log(e.target.files[0])} 
               />
               <div className="upload-icon">↑</div>
               <p>Chọn một tệp hoặc kéo và thả tệp ở đây</p>
               <small>Bạn nên sử dụng tập tin jpg chất lượng cao có kích thước dưới 20 MB hoặc tập tin .mp4 chất lượng cao có kích thước dưới 200 MB.</small>
            </div>
            </div>
            </div>
            {/*  */}
            <div>
               <div className='l'>Upload infomation</div>
            <div className='huhu'>  
               <input id="new_name" placeholder="Enter new name" />
            </div>
            <div className='huhu'>  
               <input id="new_pass" type="password" placeholder="Enter new password" />
            </div>
            <div className='huhu'>  
               <input id="new_age" type="number" placeholder="Enter new age" />
            </div>
            
            <div className='signbutton'>   
               <button type="submit">Update</button>
            </div>
            </div>
         </form>
      </div>
   );
}
