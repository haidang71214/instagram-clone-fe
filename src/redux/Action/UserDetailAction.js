import { type } from "@testing-library/user-event/dist/type";
import { DETAIL_FAIL, DETAIL_USER } from "../../Constant/Constant";
import { detailUser, logouAPI } from "../../utils/fetchFromAPI";

export const fetchdetailUser =(user_id)=> async(dispatch) =>{
   try {
      const userData = await detailUser(user_id);
      dispatch({
         type:DETAIL_USER,
         data: userData,
      })
   } catch (error) {
      console.log(error);
   }
}
// chỗ ở dưới sẽ là logout
export const userLogout = (userId)=> async(dispatch)=>{
   try {
      await logouAPI(userId);
      dispatch({
         type:DETAIL_FAIL,
         data:null
      })
   } catch (error) {
      console.log(error);
      
   }
}
//  logout hình như truyền cái user_id vào theo body thì phải
// dưới thì chắc cập nhật