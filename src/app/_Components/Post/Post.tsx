

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {PostInterface} from "@/Interfaces/PostInterfaces"
import Image from 'next/image';
import image from '../../../../public/animated_doll_mobile.gif';

import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
export default function Post(props:{post:PostInterface,allComments:boolean,isLoading:boolean,getAllCommentsLoader:boolean}) {
 let router= useRouter()

    function handleSinglePost(id:string){
      router.push(`/singlePost/${id}`)
    }
  return (
 <Paper elevation={10} sx={{my:2}}>   <Card >
 <CardHeader
   avatar={
     <Avatar sx={{ bgcolor: red[500] ,cursor:"pointer"}} aria-label="recipe">
       <Image src={props.post.user.photo} alt={props.post.user.name} width={50} height={50}/>
     </Avatar>
   }
   action={
     <IconButton aria-label="settings">
       <MoreVertIcon />
     </IconButton>
   }
   title={props.post.user.name}
   subheader={props.post.createdAt}
 />
{props.post.image&& <CardMedia
   component="img"
   height="400"
   image={props.post.image}
   alt={props.post.body}
 />}
 <CardContent>
   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    {props.post.body}
   </Typography>
 </CardContent>
 <CardActions disableSpacing sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
   <IconButton aria-label="add to favorites">
     <ThumbUpIcon />
   </IconButton>
   <IconButton aria-label="share" >
     <ShareIcon />
   </IconButton>
   <IconButton aria-label="comment" onClick={()=>handleSinglePost(props.post._id)}>
     <CommentIcon />
     {props.getAllCommentsLoader&& <CircularProgress/>}
   </IconButton>

 </CardActions>
{props.post.comments&& <>
{props.allComments? props.post.comments.map((comment)=><Box key={comment._id}>
    <CardHeader
   avatar={
     <Avatar sx={{ bgcolor: red[500] ,cursor:"pointer"}} aria-label="recipe">
       <Image src={image} alt={comment.commentCreator.name} width={50} height={50}/>
     </Avatar>
   }
   
   title={comment.commentCreator.name}
   subheader={comment.createdAt}
 />
 <CardContent>
   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    {comment.content}
   </Typography>
 </CardContent>
</Box>) :<>

 <CardHeader
   avatar={
     <Avatar sx={{ bgcolor: red[500] ,cursor:"pointer"}} aria-label="recipe">
       <Image src={image} alt={props.post.comments[0].commentCreator.name} width={50} height={50}/>
     </Avatar>
   }
   
   title={props.post.comments[0].commentCreator.name}
   subheader={props.post.comments[0].createdAt}
 />
 <CardContent>
   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    {props.post.comments[0].content}
   </Typography>
 </CardContent>
</>}
 
</>
 }

</Card>

 </Paper>
  );
}
