import { InitalInterface, PostInterface } from "@/Interfaces/PostInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosConfig } from "../axiosConfig/axiosConfig";

interface Action{
 type:string,
 meta:any,
 payload:Payload|{
    error?:string
 }
}
interface Payload{
  message:string,
  posts?:PostInterface[]
  paginationInfo:{
    total:number,
    numberOfPages:number,
    nextPage:number,
    limit:number,
},
post?:PostInterface
}
export const getPosts=createAsyncThunk('post/posts',async()=>{
   try {
    const {data}=await axiosConfig.get('/posts?limit=50',{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    return data
    
   } catch (error) {
         
      return error
      
   }

})
export const getSinglePost=createAsyncThunk('post/singlePost', async (id:string)=>{
         try {
            const {data}=await axiosConfig.get(`/posts/${id}`,{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            console.log('Dataaaaaaaaaaaaaa',data);
            return data
            
         } catch (error) {
             console.log('Erroooooooor',error);
             return error
             
         }
})
const initialState:InitalInterface={
    allPosts:null,
    error:null,
    isLoading:false,
    singlePost:null,
    getAllCommentsLoader:false
}
const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getPosts.pending,(state)=>{
            
            state.isLoading=true

        })
        builder.addCase(getPosts.fulfilled,(state,action:Action)=>{
            state.allPosts=action.payload.posts?action.payload.posts:null
            
            
            state.isLoading=false

        })
        builder.addCase(getPosts.rejected,(state)=>{
            
            
            state.isLoading=false

        })
        builder.addCase(getSinglePost.pending,(state)=>{
        console.log('single post is pending');
        
                state.getAllCommentsLoader=true
                console.log(state.getAllCommentsLoader)

        });
         builder.addCase(getSinglePost.fulfilled,(state,action:any)=>{
                console.log('single post is fulfilled');
                console.log(action.payload.post)
                state.singlePost=action.payload.post
                state.getAllCommentsLoader=false
                console.log(state.getAllCommentsLoader)

         });
         builder.addCase(getSinglePost.rejected,(state)=>{
                console.log('single post is rejected');
                state.getAllCommentsLoader=false
                console.log(state.getAllCommentsLoader)
                
         });
    }

})
export const postReducer=postSlice.reducer