import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer id="footer" className="footer-1 ">
<div className="main-footer widgets-dark typo-light">
<div className="container">
<div className="row">

  <div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget subscribe no-box">
<h5 className="widget-title">PropertyHub<span></span></h5>
 <div className='li'>
    <Link to={'/about'} className="litem">About Us</Link>
    <Link to={"/contact"} className="litem">Contact Us</Link>
    <Link to={'/jobs'} className="litem">Jobs</Link>
 </div>
</div>
</div>

  
<div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget no-box">
<h5 className="widget-title">Connect<span></span></h5>
<div className='li'>
    <Link to={'/blog'} className="litem">Blog</Link>
    <Link to={"/news"} className="litem">News</Link>
    <Link to={'/addproperty'} className="litem">Add Property</Link>
 </div>
</div>
</div>

  
<div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget no-box">
<h5 className="widget-title">Head Office<span></span></h5>
           <div className='li '>
          <div>
          <i className="fa-solid fa-location-dot " ></i>
          <span style={{marginLeft:"2px"}}>Address: 23 L, Model Town, Lahore, Punjab</span>
        
          </div>
          <div className=''>
          <i class="fa-solid fa-phone mt-2"></i>
          <span style={{marginLeft:"2px",fontSize:"15px"}}>Phone: +92 42 351 89 101 -3</span>
          </div>
          <div>
          <i class="fa-solid fa-envelope mt-2"></i>
          <span style={{marginLeft:"2px",fontSize:"15px"}}>Email: info@sagacious.pk </span>
          </div>

           </div>
</div>
</div>
  

<br/>
  <br/>
  <div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget no-box">
<h5 className="widget-title">Get Connected<span></span></h5>
            <a href="#"> <i className="fa fa-facebook"> </i> </a>
            <a href="#"> <i className="fa fa-twitter"> </i> </a>
            <a href="#"> <i className="fa fa-youtube"> </i> </a>
</div>
</div>


{/* <div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget no-box">
<h5 className="widget-title">Contact Us<span></span></h5>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
  <div className="emailfield">
<form>
<input type="text" name="email" value="Email"/>
<input name="uri" type="hidden" value="arabiantheme"/>
<input name="loc" type="hidden" value="en_US"/>
<input  className='btn btn-success submitbutton ripplelink' type="submit" value="Subscribe"/>
</form>  
</div>
</div> */}

{/* </div> */}
</div>
</div>
  
<div className="footer-copyright">
<div className="container">
<div className="row">
<div className="col-md-12 text-center">
<p>Copyright ProprtyHub © 2022. All rights reserved.</p>
</div>
</div>
</div>
</div>
</div>
</footer>
    
    </>
  )
}

export default Footer