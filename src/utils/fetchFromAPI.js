import axios from "axios";
export const BASE_URL = "http://103.57.223.234:4002";
const option = {
   params:{
      maxResults:50,
   },
   headers:{
      token:localStorage.getItem("LOGIN_USER")
   },
};
export const axiosInstance = axios.create({
   baseURL:`${BASE_URL}`,
});
//  chỗ này set cái interceptor, nếu có cái requireauth = true thì có lấy cái 
// token trong localstoreage ra add vô rồi chạy được
axiosInstance.interceptors.request.use(
   (config) =>{
         if(config.requiredAuth){
            const token = localStorage.getItem("LOGIN_USER");
            // chỗ này xác định là cái access token lưu vô đây r ha
            if(token){
               config.headers["token"] =  `${token}`
            }
         }
         return config;
   },
   (error)=>{
      return Promise.reject(error);
   }
);
const extendToken = async()=>{
   let {data} = await axiosInstance.post(
      // lấy extendToken bên chỗ ba qua đây ha
      `/auth/extend-token`,
      {},
      {
         // xét cái này để api gửi cokie về
         withCredentials:true,
      }
   )
   return data
};
// response như chỗ này là trả về, hmm cái trên là lấy token dể accept, còn ở dưới là khi token hết hạn mình phải cấp lại ý
axiosInstance.interceptors.response.use(
   (response)=>{
      return response;
   },
   async (error)=>{
      const originalRequest = error.config;
      console.log(error);
  
   if(error.response.status === 401){
      const newAccessToken = await extendToken();
      originalRequest.headers["token"] = newAccessToken;
      await axiosInstance(originalRequest)
   }
}
);
export const fetchFromAPI = async(url) =>{
   const {data} = await axiosInstance.get(`${BASE_URL}/${url}`,option);
   return data 
};
// chô này làm 1 đống cái api
// auth
export const registerAPI = async(payload) =>{
   const {data} = await axiosInstance.post(`/auth/register`,payload);
   return data;
}
export const loginAsyncKeyAPI = async(payload) =>{
   const {data}  = await axiosInstance.post(`/auth/login`,payload,{
      withCredentials : true // chỗ này cho phép gửi và nhận cookie
   })
   console.log(data,payload);
   return data
}
export const forgotPasswordAPI = async(payload) =>{
   const {data} = await axiosInstance.post(`/auth/forgotPass`,payload);
   return data;
}
export const changePassAPI =async(payload) =>{
   const {data} = await axiosInstance.post(`/auth/changePass`,payload);
   return data;
}
// login fb
export const loginFaceBook =async(payload)=>{
   const {data} = await axiosInstance.post(`/auth/loginFaceBook`,payload);
   return data
}
export const logouAPI = async(user_id) =>{
   const{data} = await axiosInstance.post(`/auth/logout`,{user_id});
   return data;
}
// bên chỗ update user thì nhận vào 2 giá trị, 1 là cái user_id 2 là cái form data
// cái form data nó có hơi khá 1 xíu
export const updateUserAPI = async(user_id,formData) =>{
   const {data} =await axiosInstance.put(`/auth/updateUser/${user_id}`,formData,{
      headers:{
         // ? nhớ set cái này nếu nó truyền đi 1 cái form data chứ kh phải là 1 cái payload
         'Content-Type':"multipart/form-data",
      }
   });
   return data
};

// image 
export const getAllImg = async()=>{
   const {data} = await axiosInstance.get(`/image/get-add-image`) 
   return data;
}
// thứ 2 là chỗ này không cần lắm
export const uploadImg = async(user_id,formData) =>{
   const {data} = await axiosInstance.post(`/image/upload-image-cloud/${user_id}`,formData,{
      headers:{
         // ? nhớ set cái này nếu nó truyền đi 1 cái form data chứ kh phải là 1 cái payload
         'Content-Type':"multipart/form-data",
      }
   })
   return data;
}

export const getDetailImg = async(image_id) =>{
   const {data} = await axiosInstance.get(`/image/get-detail/${image_id}`);
   return data
}
export const deleteImage = async(image_id)=>{
   const {data} = await axiosInstance.delete(`/image/deleteimg/${image_id}`);
   return data;
}
// user
export const comment = async(image_id,payload)=>{
   const {data} = await axiosInstance.post(`/user/comment/${image_id}`,payload);
   return data;
}
// lỗi đây, lỗi do cái này bị thay đổi phương thức
export const detailUser = async(user_id)=>{
   const {data} =await axiosInstance.get(`/user/detail-user/${user_id}`);
   return data;
}
export const getAllUser = async()=>{
   const {data} = await axiosInstance.get(`user/getAllUserDetail`);
   return data;
}