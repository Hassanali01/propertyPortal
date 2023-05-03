import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const Authlogin = createAsyncThunk("users/auth",async(user)=>{

 const response = await axios.post('http://localhost:8001/auth/login',user);
    return response.data;
}) 


export const userSlice = createSlice({
    name:"userAuth",
    initialState:{
        user:JSON.parse(localStorage.getItem("user"))|| null,
        pending:null,
        error:null,
    },
    reducers:{
        loginStart:(state)=>{
         state.pending =true;
         state.error = false;
        },
        loginSuccess :(state,action)=>{
            state.pending =false;
            state.user = action.payload;
            state.error = false
        },
        loginFailure:(state)=>{
         state.pending=false;
         state.error=true
        },
        logout:(state)=>{
        localStorage.clear();  
         state.user = null;
         state.error =false;
         state.pending = false
        }

    },
    // extraReducers:{
    //     [Authlogin.pending]:(state) => {
    //       state.pending = true;
    //       state.error = false;
    //     },
    //     [Authlogin.fulfilled]:(state,action) =>{
    //         state.user = action.payload;
    //         state.pending = false
    //     },
    //     [Authlogin.rejected]:(state)=>{
    //         state.pending = false;
    //         state.error =true;
    //     } 
    // }
})
export const userSelector  = (state) => state.user
export const {loginStart,loginSuccess,loginFailure,logout} = userSlice.actions;



export default userSlice.reducer;