import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDSPhim } from '../../redux/Action/DsimgAction';
import style from '../style.css'; // Nhớ import CSS mới ở đây
import { useNavigate } from 'react-router';

export default function Home() {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const { userDetail } = useSelector((state) => state.userReducer);
   const { imageList } = useSelector((state) => state.imageReducer);
   
   useEffect(() => {
      dispatch(fetchDSPhim());
   }, [dispatch, userDetail]);

   const handLeimg = (img_id) => {
      navigate(`/detailimg/${img_id}`);
   }

   const renderDsPhim = () => {
      if (!Array.isArray(imageList) || imageList.length === 0) {
         return <div>chưa có dữ liệu</div>;
      }

      return imageList.map((item, index) => {
         const panelClass = index % 2 === 0 ? 'panel tall-panel' : 'panel';
         const delayClass = `delay-${(index % 4) + 2}`; // Thêm delay cho từng ảnh
         return (
            <div key={item.image_id} className={panelClass}>
               <img 
                  onClick={() => handLeimg(item.image_id)}
                  className={`panel-img ${delayClass}`} 
                  src={item.url} 
                  alt={item.image_name} 
               />
            </div>
         );
      });
   };

   return (
      <div className="wrapper">
         <article className="content">
            {renderDsPhim()}
         </article>
      </div>
   );
}
