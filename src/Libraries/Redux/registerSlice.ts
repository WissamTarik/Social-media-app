
import { ActionInterface, SignUpDataInterface, SignUpInterface } from '@/Interfaces/authInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosConfig } from '../axiosConfig/axiosConfig';
import axios from 'axios';


export const handleSignUp=createAsyncThunk('register',async(values:SignUpDataInterface)=>{
    console.log("Values",values)
    try {
        
        const {data}=await axios.post('https://linked-posts.routemisr.com/users/signup',values)
         return data
    } catch (error) {
        return error
    }
})
const initialState:SignUpInterface={
    isLoading:false,
    error:null,
   
}
const registerSlice=createSlice({
    name:"register",
    initialState,
    reducers:{
    },
   extraReducers:(builder)=>{
    builder.addCase(handleSignUp.pending,(state)=>{
        
        state.isLoading=true
    })

    builder.addCase(handleSignUp.fulfilled,(state,action:ActionInterface)=>{
        state.error=action.payload?.response?.data.error? action.payload?.response?.data.error:null;
    
        state.isLoading=false

    })
    builder.addCase(handleSignUp.rejected,(state)=>{
        state.isLoading=false

    })
   }
    
})
export const registerReducer=registerSlice.reducer