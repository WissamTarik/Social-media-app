'use client'

import React, { useRef } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, storeType } from '@/Libraries/Redux/store';
import { createPostFunction } from '@/Libraries/Redux/createPostSlice';
import { toast } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
export default function CreatePost() {
     const [postBody, setPostBody] = React.useState('')
     const [imageSrc, setImageSrc] = React.useState('')
     const fileInputRef=useRef<HTMLInputElement>(null)
     const [postImage, setPostImage] = React.useState<object>({})
     const {message,isLoading}= useSelector((store:storeType)=>store.createPostReducer)
       const dispatch=useDispatch<dispatchType>()
     function handlePostBody(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
       setPostBody(e.target.value)
       
     }
     function handlePostImage(e:React.ChangeEvent<HTMLInputElement>){
      if(e.target.files ){
        setPostImage(e.target.files[0])
        setImageSrc(URL.createObjectURL(e.target.files[0]))
      }
     }
     function createPost(){
      dispatch(createPostFunction({postBody,postImage})).then((res)=>{
        if(res){
          toast.success("Post Created")
          setPostBody('')
          setImageSrc('')
          if(fileInputRef.current){
            fileInputRef.current.value=''
          }
        }else{
          toast.error("failed to upload the post")
        }
      })
     }
     function handleImageClose(){
      setImageSrc('')
     if(fileInputRef.current){
      fileInputRef.current.value=''
     }
     }
  return (

    <>
   <Paper elevation={10} sx={{p:2 ,my:3}}>

      <Typography component={'h2'} variant={'h4'} sx={{mb:1}}>Create Post</Typography>

             <TextField
          id="outlined-textarea"
          label="what is in your mind?"
          placeholder="What is in your mind?"
          multiline
          fullWidth
          rows={4}
          value={postBody}
          onChange={(e)=>handlePostBody(e)}
        />
  <Button
  fullWidth
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      sx={{backgroundColor:'#1976D2',color:'white',my:1}}
    >
      
      Upload a file <CloudUploadIcon sx={{ml:2}}/>
      <TextField type="file"
      inputRef={fileInputRef}
       onChange={(e)=>handlePostImage(e as React.ChangeEvent<HTMLInputElement>)}
      sx={{clip:'rect(0 0 0 0)',clipPath:'inset(50%)',overflow:'hidden',color:'white',backgroundColor:"#1976D2" ,position:'absolute',width:'1px',height:'1px',bottom:"0",left:"0" }}
 />
    </Button>       
    
    
     <Button fullWidth variant='contained'
      type="submit"
      onClick={createPost}
     sx={{transition:"0.5s color,0.5s background-color",color:'#1976D2', my:1,":hover":{color:"white",backgroundColor:"#1976D2"}, border:"2px solid #1976D2",borderRadius:"6px",backgroundColor:"white"}}> 
             {isLoading?<CircularProgress /> :'Submit'}
          
      </Button>
     
        {imageSrc&& 
         <Box sx={{textAlign:"center" , position:'relative'}}>
        <img src={imageSrc} width={200}/>
        <CloseIcon sx={{position:'absolute',top:0 ,cursor:"pointer"}} onClick={handleImageClose}/>
        </Box>
        }
       
       
   </Paper>
    </>
  )
}
