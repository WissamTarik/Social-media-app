
import { CreatePost, PostData } from '@/Interfaces/CreatePostInterface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosConfig } from '../axiosConfig/axiosConfig';
import axios from "axios"

export const createPostFunction=createAsyncThunk('createPost',async ({postBody,postImage}:PostData)=>{
     const formData=new FormData()
     formData.append('body',postBody)
     console.log(postImage)
     formData.append('image',postImage )
     try {
         const {data}=await axios.post('https://linked-posts.routemisr.com/posts',formData,{
            headers:{
                token:localStorage.getItem('token')
            }
         })
         console.log('Dataaaaaaaa',data);
         
          
         return true
     } catch (error) {
        console.log('Errorrrrrrrrrr',error);
          return false
     }
})
const initialState:CreatePost={
    isLoading:false,
    message:'',
}
export const createPostSlice= createSlice({
    name:'createPost',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(createPostFunction.pending,(state)=>{
            console.log('Pendinnng');
            
            state.isLoading=true
        })
        builder.addCase(createPostFunction.fulfilled,(state)=>{
            console.log('Fulfilled');
             state.message="Post Created"
            state.isLoading=false
        })
        builder.addCase(createPostFunction.rejected,(state)=>{
            console.log('rejected');
             state.message="Can't create post"
            state.isLoading=false
        })
    }
})
export const createPostReducer=createPostSlice.reducer