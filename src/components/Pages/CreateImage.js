import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateDsImg } from '../../redux/Action/DsimgAction';
import { toast } from 'react-toastify';
import './CreateImage.css'; // Import file CSS riêng

export default function CreateImage() {
   const user_id = localStorage.getItem('user_id');
   const fileInputRef = useRef();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      const name = document.getElementById('new_imgname').value;
      const title = document.getElementById('title').value;
      const file = fileInputRef.current.files[0];

      if (!file || !name || !title) {
         alert('Vui lòng nhập đầy đủ các trường');
      } else {
         formData.append('image_name', name);
         formData.append('title', title);
         formData.append('imgfile', file);
         dispatch(updateDsImg(user_id, formData));
         navigate('/detailUser');
         toast.success('Tạo thành công');
      }
   };

   return (
      <div className="create-image-container">
         <form onSubmit={handleSubmit} className="create-image-form">
            <div style={{display:'block'}}>
            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => console.log(e.target.files[0])} 
               />
               {/* tí sửa lại cái này */}
               <div className="upload-icon">↑</div>
               <p>Chọn một tệp hoặc kéo và thả tệp ở đây</p>
               <small>Bạn nên sử dụng tập tin jpg chất lượng cao có kích thước dưới 20 MB hoặc tập tin .mp4 chất lượng cao có kích thước dưới 200 MB.</small>
            </div>
            </div>
            <div>
            <div className="input-group">
               <label htmlFor="title">Tiêu đề</label>
               <input id="title" placeholder="Thêm tiêu đề" />
            </div>

            <div className="input-group">
               <label htmlFor="new_imgname">Tên hình ảnh</label>
               <input id="new_imgname" placeholder="Thêm mô tả chi tiết" />
            </div>
            </div>
            <button type="submit" style={{backgroundColor:'#rgb(169, 48, 169) !important'}} className="submit-button">Tạo thoai</button>
         </form>
      </div>
   );
}
