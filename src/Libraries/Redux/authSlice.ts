import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginDataInterface, LoginInterface,ActionInterface } from './../../Interfaces/authInterfaces';
import { axiosConfig } from "../axiosConfig/axiosConfig";
import axios from "axios";

export const handleLogin=createAsyncThunk('auth',async(values:LoginDataInterface)=>{
       try {
         const {data}=await axiosConfig.post('/users/signin',values)
         return data
       } catch (error) {
              return error
       }
})
const initialState:LoginInterface={
    token:null,
    isLoading:false,
    isError:false,
    errorMessage:null
}


const authSlice=createSlice({
 name:'auth',
 initialState,
 reducers:{
    handleLogOut:(state)=>{
           state.token=null;
           state.isLoading=false;
    },
    
 },
 extraReducers:(builder)=>{
    builder.addCase(handleLogin.pending,(state)=>{
        state.isLoading=true,
        console.log('Login pending');
        
    }),
    builder.addCase(handleLogin.fulfilled,(state,action:ActionInterface)=>{
          console.log('Login fulfilled');
          console.log(action.payload)
          state.token=action.payload.token? action.payload.token:null;
          localStorage.setItem("token",action.payload.token);
          state.isLoading=false;
          state.errorMessage=action.payload?.response?.data.error?action.payload?.response?.data.error:null

          
    })
    builder.addCase(handleLogin.rejected,(state,action:any)=>{
           
          console.log('Login Rejected');
          state.isLoading=false
          state.isError=true
    })
 }
})
export const authReducer=authSlice.reducer