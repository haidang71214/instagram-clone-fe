import { DETAIL_FAIL, DETAIL_USER } from "../../Constant/Constant"

const initialState = {
   userDetail:null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case DETAIL_USER:
    return { ...state,userDetail:action.data }
    // cái user detail này căn bản nó lấy dữ kiện trong chỗ fetch bằng cái .data rồi ý
    // nên khi làm nhớ để ý là đừng có . thêm cái data vào
   case DETAIL_FAIL:
      return {...state,userDetail:action.data}; // xử lí null
  default:
    return state
  }
}
export default userReducer
