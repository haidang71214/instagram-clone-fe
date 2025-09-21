import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { comment, getDetailImg } from "../../utils/fetchFromAPI";
import { useDispatch, useSelector } from "react-redux";
// gọi lại getDetailImg khi cập nhật xong
export default function DetailImge() {
   const { image_id } = useParams();
   const [detailImg, setDetailImg] = useState(null);
   const { userDetail } = useSelector((state) => state.userReducer);
   const user_id = localStorage.getItem("user_id");

   useEffect(() => {
      getDetailImg(image_id)
         .then((results) => {
            setDetailImg(results);
         })
         .catch((error) => {
            console.error("Error fetching image details", error);
         });
   }, [image_id]);
   
   //
   const handleSend = (e) => {
      e.preventDefault();
      const getinput = document.getElementById("commentee").value;
      if (!getinput) return;
      const payload = { user_id, comments: getinput };
      comment(image_id, payload)
         .then((result) => {
            if (result) {
               console.log("Comment thành công", result);
               setDetailImg((prevDetailImg) => ({
                  ...prevDetailImg,
                  comments: [...prevDetailImg.comments, result.data],
               }));

               document.getElementById("commentee").value = "";
               console.log(detailImg);
            } else {
               console.log("Chưa thêm được comment");
            }
         })
         .catch((error) => {
            console.error("Lỗi khi gửi comment", error);
         });
   };

   const AuthorUser = () => {
      if (!userDetail) {
         return <div>đợi xíu cho data nó load cái</div>;
      }
      return (
         <div style={{ display: "flex", alignItems: "center" }}>
            <div>
               <img
                  style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                  src={userDetail.avartar}
               />
            </div>
            <div>
               <div className="blurforsth">{userDetail.full_name}</div>
               <div className="emailauthor">{userDetail.email}</div>
            </div>
         </div>
      );
   };
  
   //
   const renderComment = () => {
      return detailImg.comments.map((item, index) => {
         if (!detailImg.comments || detailImg.comments.length === 0 || !item) {
            return <div>Hong có comments</div>;
         }

         if (!item.user) {
            return <div>Từ từ miếng coi</div>;
         }

         return (
            <div>
               <div style={{ display: "flex" }}>
                  <div>
                     <img
                        style={{ width: "30px", height: "30px", borderRadius: "30%" }}
                        src={item.user.avartar}
                     />
                  </div>
                  <div style={{ display: "block" }}>
                     <div>{item.user.full_name}</div>
                     <div style={{ fontSize: "10px" }}>{item.comment_date}</div>{" "}
                  </div>
               </div>
               {/*  */}
               <div style={{ paddingLeft: "30px" }}>
                  <div>{item.noi_dung}</div>
               </div>
            </div>
         );
      });
   };
   const renderDetailImg = () => {
      if (!detailImg) {
         return <div>Chưa load ra dữ liệu</div>;
      }
      return (
         <div className="displayimgdetail">
            <div>
               <img className="detailk" src={detailImg.url} />
            </div>
            <div className="detailleft">
               <div style={{ fontWeight: "bold", fontSize: "50px" }}>{detailImg.image_name}</div>
               <div>{detailImg.tittle}</div>
               {AuthorUser()}
               <div className="commentForm">
                  <div>Comment site: </div>
                  {renderComment()}
               </div>
               <div
                  className="pps"
                  style={{
                     display: "flex",
                     alignItems: "flex-start",
                     gap: "10px",
                  }}
               >
                  <input
                     id="commentee"
                     placeholder="Thêm nhận xét : "
                     style={{
                        display:'block',
                        padding:'50px',
                        fontSize: "16px",
                        borderRadius: "5px",
                        width: "300px",
                        border: "1px solid #ccc",
                     }}
                  />
                  <button
                     onClick={(e) => {
                        handleSend(e);
                     }}
                     className="sendit"
                     style={{
                        alignItems:'center',
                        flexDirection:'row',
                        textAlign:'center',
                        padding: "10px 55px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                     }}
                  >
                     Send
                  </button>
               </div>
            </div>
         </div>
      );
   };

   return <div className="ook">{renderDetailImg()}</div>;
}
