import { ADD_IMG, GET_ALL_IMG } from "../../Constant/Constant";

const initialState = {
   imageList: []
};

// Gán function vào biến reducer trước khi export
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_IMG: 
      // lấy data bên chỗ reducer trả về xong add vô đây
      return { ...state, imageList: action.data };
    case ADD_IMG:
      //  thao tác lấy
      return {...state,imageList:[...state.imageList,action.data]}
    default:
      return state;
  }

};

export default imageReducer;
