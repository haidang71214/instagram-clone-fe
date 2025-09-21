import {createStore,applyMiddleware,combineReducers} from 'redux';
import { thunk } from 'redux-thunk';
// reducer lưu vô đây
import imageReducer from '../redux/Reducer/DsimgReducer';
import userReducer from '../redux/Reducer/UserReducer';


const rootReducer = combineReducers({
   imageReducer, 
   userReducer,
   
});
// lưu vô đây r ha
const store = createStore(rootReducer,applyMiddleware(thunk));
export default store;