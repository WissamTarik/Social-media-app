'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Paper, Container, Button,Typography, CircularProgress, Alert } from '@mui/material';
   import { useFormik } from 'formik';
import { LoginDataInterface } from '@/Interfaces/authInterfaces';
import * as Yup from "yup"
import { handleLogin } from '@/Libraries/Redux/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, storeType } from '../../../Libraries/Redux/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
   let dispatch=useDispatch<dispatchType>()
   let router=useRouter()
   const {authReducer} = useSelector((store: storeType) => store);
   const validationSchema=Yup.object().shape({
     email:Yup.string().email("Invalid Email").required("Email is required to login"),
     password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Invalid Password').required('Password is required to register')
  })
  const initialValues:LoginDataInterface={
     email:"",
     password:""
  }
    const loginFormik=useFormik({
          initialValues,
          validationSchema,
          onSubmit:(values:LoginDataInterface)=>{
           dispatch(handleLogin(values)).then((res)=>{
            console.log("response",res);
            
            if(res.payload.token){
                toast.success("Logged successfully")
                router.push('/')
            }
            else{
              toast.error("Invalid Login")
            }
           })
            console.log(values);
            
          }
    })
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
   <Container maxWidth="sm" sx={{py:3}}>
       <Paper sx={{ display: 'flex', flexWrap: 'wrap' ,my:2 ,p:4 }} elevation={10}>
      
     <form action="" onSubmit={loginFormik.handleSubmit}>
       <Typography color="#1565C0" component={"h2"}>Login Now</Typography>
       {authReducer.errorMessage?<Alert variant="filled" severity="error">
         {authReducer.errorMessage}</Alert>:""}
       <FormControl sx={{ mt: 2  }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
              name="email"
            label="Email"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.email}
            onBlur={loginFormik.handleBlur}
          />
        </FormControl>
               {loginFormik.errors.email&& loginFormik.touched.email? <Typography color="red">{loginFormik.errors.email}</Typography>:''}

     <FormControl sx={{ my: 3  }}variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
            onBlur={loginFormik.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
            {loginFormik.errors.password&& loginFormik.touched.password? <Typography color="red">{loginFormik.errors.password}</Typography>:''}

        <Button variant="outlined" type='submit' fullWidth sx={{":hover":{
          backgroundColor:'#1565C0',
          color:"white",
        },transition:"0.5s all"}}>{authReducer.isLoading?<CircularProgress sx={{color:"white"}} />:'Submit'}</Button>
     </form>
     
    
     
    </Paper>
   </Container>
  );
}
