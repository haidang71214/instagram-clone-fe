import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchdetailUser } from "../../redux/Action/UserDetailAction";
import style from "../style.css";
import { deleteImage } from "../../utils/fetchFromAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function DetailUser() {
   const navigate = useNavigate();
   // chỗ này render ra chi tiết người dùng, với tất cả những cái ảnh mà người dùng đó tạo
   const user_id = localStorage.getItem("user_id");
   const dispatch = useDispatch();
   const { userDetail } = useSelector((state) => state.userReducer);
   useEffect(() => {
      if(!userDetail){
         dispatch(fetchdetailUser(user_id));
      }  
      console.log(userDetail);

      
   }, [user_id,dispatch,userDetail]);

   const renderUserDetail = () => {
      // design cái layout
      if (!userDetail) {
         // loading
         return <div>Chưa có dữ kiện</div>;
      }
      return (
         <div className="duamaa">
            <div>
               <img className="imgdetail" src={userDetail.avartar} />
            </div>
            <div className="full_namee">
               <div className="oo">
                  {userDetail.full_name} <p>in the age : {userDetail.age}</p>
               </div>
            </div>
            <div>
               <p>{userDetail.email}</p>
            </div>
         </div>
      );
   };
   const deteleFunction =(item) =>{
      // img_id
      const payload = { image_id: item.image_id};
      deleteImage(payload).then((result)=>{
         toast.success(result); 
         fetchdetailUser(user_id);
         navigate('/');

      }).catch((error)=> {
         console.log(error);
      })
   }

   const renderDelete = ()=>{
      //nếu cái user_id trong cái localhost = cái user_id trong userDetail
      if(user_id == userDetail.images[0].user_id){
         return<div>Xóa ảnh</div>
      }
      return <div></div> // chỗ này là cho đứa khác vào coi
   }

   const renderImg = () => {
      if (!userDetail || !userDetail.images) {
         // Nếu chưa có userDetail hoặc images, hiển thị thông báo
         return <div class="pulsing-9"> Đang load đợi xíu </div>;
       }
      return userDetail.images.map((item, index) => {
        const panelClass = index % 5 === 0 ? 'panel tall-panel' : 'panel';
         return (
            <div className={panelClass} key={index}>
               {/* có quyền mới hiện cái delete ra */}
               <div onClick={(item)=>{deteleFunction(item)}} style={{position:'absolute',zIndex:'1',display:'block',right:'0px',backgroundColor:'red', borderBottomLeftRadius:'30px',paddingLeft:'15px',paddingRight:'15px'}}>{renderDelete()}</div>
               <div onClick={()=>{navigate(`/detailimg/${item.image_id}`)}} > <img className="panel-img" src={item.url}/></div>
               <div className="nameimgg">{item.image_name}</div>
               <div>{item.tittle}</div>
            </div>
         );
      });
   };
   return (
      <div className="detailmain">
         {renderUserDetail()}
         <div>Imgage của bé : </div>
         <div className="wrapper">
         <article className="content">
         {renderImg()}
         </article>
         </div>
         
      </div>
   );
}
