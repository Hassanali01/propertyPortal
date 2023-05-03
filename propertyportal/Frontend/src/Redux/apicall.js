import axios from "axios";
import originURL from "../url";
import { NotificationManager } from "react-notifications";

export default function UserSDK() {
  this.UserLogin = async (user) => {
  
   const users = await axios.post(`${originURL}/auth/login`,user);
   return users
  };

  this.checkAuth = (status)=>{
    if(status === 200){
       return true;
    }
  }
  return this;
}
