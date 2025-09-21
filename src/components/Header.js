import React, { useEffect, useState } from "react";
import style from "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchdetailUser, userLogout } from "../redux/Action/UserDetailAction";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from 'react-router-dom';
import { logouAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";


export default function Header() {
   const user_id  = localStorage.getItem('user_id')
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { userDetail } = useSelector((state) => state.userReducer);
   const [menuOpen, setMenuOpen] = useState(false);

   

    useEffect(() => {
      const user_id  = localStorage.getItem('user_id');
      if(user_id){
         dispatch(fetchdetailUser(user_id))
      }
      console.log("userdetail : ",userDetail);
      
   }, [user_id,dispatch])

   const logOut = () =>{
      logouAPI(user_id).then((result)=>{
         toast.success(result.message)
         localStorage.removeItem('user_id');
         localStorage.removeItem('LOGIN_USER');
         dispatch(fetchdetailUser(null))
      }).catch((error)=>{
         toast.success('Lỗi vớ vẩn =))')
      })
   }
   useEffect(() => {
      const userId = localStorage.getItem("user_id");
      if (userId && !userDetail) { // Kiểm tra nếu chưa có userDetail thì mới gọi API
         dispatch(fetchdetailUser(userId));
      }
      
   }, [dispatch, userDetail]); // Chỉ phụ thuộc vào dispatch và userDetail để tránh vòng lặp vô hạn

   const handleOptionClick = (option) => {
      setMenuOpen(false); 
   
      switch (option) {
         case "Update":
            navigate('/updateUser')
            console.log("Update selected");
            break;
         case "Detail":
            navigate('/detailUser')
            console.log("Detail selected");
            break;
         case "Logout":
            {logOut()}
            console.log("Logout selected");
            break;
         default:
            console.log("Option not found");
      }
   };
   
   const detailUser = () => {
      if (!userDetail) {
         return (
            <div className="buttonS">
               <button onClick={() => navigate("/register")}>Đăng kí</button>
               <button onClick={() => navigate("/login")}>Đăng nhập</button>
            </div>
         );
      } else {
         // làm 1 cái if cho trường hợp chưa có avatar:
         if(!userDetail.avartar){
            userDetail.avartar = 'https://i.pinimg.com/564x/2d/92/17/2d9217418f08015e85df1fc935ca2de6.jpg'
         } 
         return (
            <div style={{display:'flex'}}>
               <img
                  style={{ width: "70px", height: "70px", borderRadius: "50%", cursor: "pointer" }}
                  src={userDetail.avartar}
                  onClick={toggleMenu}
                  alt="Avatar"
               />
               
               {menuOpen && (
                  <div className="menu">
                     <p onClick={() => handleOptionClick("Update")}>Update User</p>
                     <p onClick={() => handleOptionClick("Detail")}>Detail User</p>
                     <p onClick={() => handleOptionClick("Logout")}>Logout Hehe</p>
                  </div>
               )}
               <div>
                  <div className="blurforsth">{userDetail.full_name}</div>
                  <div className="emailauthor">{userDetail.email}</div></div>
            </div>
         );
      }
   };

   const toggleMenu = () => {
      setMenuOpen((prev) => !prev); // Bật/tắt menu
   };

   const taoNavigate = () => {
      if (!userDetail) {
         navigate("/login"); // Chuyển hướng tới login nếu chưa có userDetail
      } else {
         navigate("/createImg"); // Chuyển hướng tới trang tạo nếu đã có userDetail
      }
   };

   return (
      <div className="head">
         <div className="buttonS">
            <button onClick={() => navigate("/")}>Trang chủ</button>
            <button className="tao" onClick={taoNavigate}>
               Tạo
               <KeyboardArrowDownIcon style={{ color: "white" }} />
            </button>
         </div>
         <div>
            <input />
         </div>
         <div className="usernavbut">{detailUser()}</div>
      </div>
   );
}
