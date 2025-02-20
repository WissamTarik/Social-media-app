'use client'

import { getSinglePost } from '@/Libraries/Redux/postSlice'
import { dispatchType, storeType } from '@/Libraries/Redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postReducer } from './../../../../Libraries/Redux/postSlice';
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import Post from '@/app/_Components/Post/Post'
import Loading from '@/app/Loading'

export default function SinglePost(props:{params:{id:any}}) {
    let dispatch=useDispatch<dispatchType>()
  const {isLoading,singlePost,getAllCommentsLoader}=  useSelector((store:storeType)=>store.postReducer)
      useEffect(()=>{
        dispatch(getSinglePost(props.params.id));
      },[])    
  return (
    <>
     <Container maxWidth="md">
       {singlePost?  <Post post={singlePost} allComments={true} getAllCommentsLoader={getAllCommentsLoader}/> :<Loading/>}
     </Container>
    </>
  )
}
