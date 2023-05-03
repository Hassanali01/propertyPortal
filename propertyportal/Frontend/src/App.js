import Header from './Components/Header/Header'
import Home from './Pages/Home/Home';
import { useState } from 'react';
import HomePartners from './Components/Home Partners/HomePartners'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
// import AddProperty from './Components/AddProperty/AddProperty';
import Register from './Pages/Register/Register';
import PropertyListing from './Pages/PropertyListing/PropertyListing';
import SingleProperty from './Components/PropertyDetail/SingleProperty';
import RequestProperty from './Pages/RequestProperty/RequestProperty';
import RequestedPropertyListing from './Pages/RequestedPropertyListing/RequestedPropertyListing';
import Rent from './Pages/Rent/Rent';
import Login from './Pages/Login/Login';
import AddProperty from './Pages/userPortal/Pages/AddProperty';
import { useSelector } from 'react-redux';
import {userSelector} from './Redux/userSlice'
import NotFound from './Pages/404/NotFound';
function App() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const user  = useSelector(userSelector)
  console.log("logged In User",user)
  return (
   <>
    <BrowserRouter>
       <Header show={show} handleShow={handleShow} handleClose={handleClose}/>
        <Routes>      
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path='/addproperty' element={<AddProperty/>}></Route> */}
        <Route path='/addproperty' element={user ?<AddProperty/> :<Login/>}></Route>
        <Route path='/requestproperty' element={user ? <RequestProperty /> :<Login/>}></Route>
        <Route path='/register' element={!user && <Register handleShow={handleShow}/>}></Route>
        <Route path='/propertylisting' element={<PropertyListing />}></Route>
        <Route path='/propertylisting/propertyDetail' element={<SingleProperty />}></Route>
        <Route path='/requestedpropertylisting' element={user ? <RequestedPropertyListing/>:<Login/>}></Route>
        <Route path='/rentalproperties' element={<Rent/>}></Route>
        <Route path='/login' element={!user && <Login/>}/>
        <Route path="*" element={<NotFound/>}/>
       </Routes>
       <HomePartners/>
       <Footer/>
    </BrowserRouter>
   </>
  );
}

export default App;
