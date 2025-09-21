import { ADD_IMG, GET_ALL_IMG } from "../../Constant/Constant";
import { getAllImg, uploadImg } from "../../utils/fetchFromAPI";
// thao tác với ảnh
export const fetchDSPhim = () => async (dispatch) => {
    try {
        const imgData = await getAllImg();
        dispatch({
            type: GET_ALL_IMG,
            data: imgData,
        });
    } catch (error) {
        console.log("Error dispatching Imafe list", error);
    }
};
// thứ nhất là cập nhật trong reducer
// tức là chỗ ni cần truyền đi 2 cái
export const updateDsImg = (user_id,formDataImge) => async(dispatch) =>{
    try {
        const uploadImage =await uploadImg(user_id,formDataImge);
        dispatch({
            type:ADD_IMG,
            data:uploadImage,
        })
    } catch (error) {
        console.log("error",error);
        
    }
}
