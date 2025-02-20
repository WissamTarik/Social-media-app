
'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Post from './_Components/Post/Post';
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, storeType } from '@/Libraries/Redux/store';
import { getPosts } from '@/Libraries/Redux/postSlice';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import CreatePost from './_Components/CreatePost/CreatePost';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Home() {
  let dispatch=useDispatch<dispatchType>()
   const {postReducer}=useSelector((store:storeType)=>store)

   React.useEffect(()=>{
    dispatch(getPosts())
   },[])
  return (
     <Container maxWidth="lg">
      
    

      {postReducer.isLoading? <Box  sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <CircularProgress size="3rem" />
      </Box>:   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, md: 2 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
        <CreatePost/>
           {postReducer.allPosts?.map((post)=><Post key={post._id} post={post} allComments={false} isLoading={postReducer.isLoading} getAllCommentsLoader={postReducer.getAllCommentsLoader}/>)}
        </Grid>
        <Grid size={{ xs: 0, md: 2 }}>
        </Grid>
      
      </Grid>
    </Box>}
     </Container>
  );
}
