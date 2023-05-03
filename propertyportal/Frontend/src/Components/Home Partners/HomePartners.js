import React from 'react'
import  './homepartners.css'
import {logos} from "./index"
const HomePartners = () => {
  
   
  return (
    <>
    <div className='homepartners'>
     <div><h6 style={{padding:"10px 10px",paddingTop:"10px",fontWeight:"bold",fontSize:"20px"}}>Our Home Partners</h6></div>
     <div className='flex'>
        <div className='flexitem'><img src={logos.l1} alt="banklogo"/></div>
        <div className='flexitem'><img src={logos.l2} alt="banklogo"/></div>
        <div className='flexitem'><img src={logos.l3} alt="banklogo"/></div>
        <div className='flexitem'><img src={logos.l4} alt="banklogo"/></div>
     </div>
    </div>
    </>
  )
}

export default HomePartners