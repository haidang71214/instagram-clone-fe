
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Header from './components/Header';
import LoginTemplates from './types/templates/login/LoginTemplates';
import Register from './types/templates/login/Register';
import { ToastContainer } from "react-toastify";
import UpdateUser from './components/Pages/UpdateUser';
import 'react-toastify/dist/ReactToastify.css';
import DetailUser from './components/Pages/DetailUser';
import CreateImage from './components/Pages/CreateImage';
import DetailImge from './components/Pages/DetailImge';
import ForgotPass from './components/Pages/ForgotPass';
import ResetPassWord from './components/Pages/ResetPassWord';
import Socket from './components/Pages/Socket.js';
import Footer from './components/Pages/Footer.js';
function App() {
  return (
    <>
    <ToastContainer position="bottom-right"/>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<LoginTemplates/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/updateUser' element={<UpdateUser/>}/>
    <Route path='/detailUser' element={<DetailUser/>}/>
    <Route path='/createImg' element={<CreateImage/>}/>
    {/* ? */}
    <Route path='/detailimg/:image_id' element={<DetailImge/>}/>
    <Route path='/forgotpass' element={<ForgotPass/>}/>
    {/*  */}
    <Route path='/changepass' element={<ResetPassWord/>}/>
    <Route path='/socket' element={<Socket/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
