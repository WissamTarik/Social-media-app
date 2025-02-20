import axios from 'axios';

export const axiosConfig=axios.create({
 baseURL:'https://linked-posts.routemisr.com',
 headers:{
  "Accept":'application/json',
  "Content-Type":'application/json'
 }
})