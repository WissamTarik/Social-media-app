'use client'

import React from 'react'
import Container from '@mui/material/Container'
import { Alert, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Input from '@mui/material/Input';
import { useFormik } from 'formik'
import * as Yup from "yup"
import { SignUpDataInterface } from '@/Interfaces/authInterfaces';

import { useDispatch, useSelector } from 'react-redux'
import { dispatchType, storeType } from '@/Libraries/Redux/store'
import { handleSignUp } from '@/Libraries/Redux/registerSlice'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formattedDate, setFormattedDate] = React.useState<string>("");
    const router=useRouter()
   const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [value, setValue] = React.useState('female');
    let dispatch=useDispatch<dispatchType>()
    const {registerReducer}=useSelector((store:storeType)=>store)
    
   const validationSchema=Yup.object().shape({
         name:Yup.string().min(3,'Name must be at least 3 characters').max(15,'Name must be at most 15 characters').required("Name is required to register"),
         email:Yup.string().email("Invalid Email").required("Email is required to register"),
         password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must start with capital letters and include special characters and small characters ').required("Password is required to register"),
         rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and re-Password aren\'t match' ).required("re-Password is required to register"),
         dateOfBirth:Yup.string().required("Date of birth is required"),
         gender:Yup.string().oneOf(['male','female'],'Gender is female or male').required("Gender is required to register")
   })
   const initialValues:SignUpDataInterface={
     name:'',
     email:'',
     password:'',
     rePassword:'',
     dateOfBirth:"",
     gender:'',
   }
     const registerFormik=useFormik({
      initialValues,
      validationSchema,
      onSubmit:(values)=>{
        
        dispatch(handleSignUp(values)).then((res)=>{
          if(res.payload.message=="success"){
            toast.success("Welcome to our social media app")
            router.push('/login')
          }
          else{
            toast.error("Falied to register")
          }
          console.log('Response',res);
          
        })
        
      }
     })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  return (
    <>
    <Container maxWidth="sm" sx={{my:3}}>
          <Paper sx={{ display: 'flex', flexWrap: 'wrap' ,my:2 ,p:4 }} elevation={10}>
                 <form action="" onSubmit={registerFormik.handleSubmit}>
                   {registerReducer.error?<Alert variant="filled" severity="error">
         {registerReducer.error}</Alert>:""}
                 <Typography color="#1565C0" component={"h2"}>Register Now</Typography>
                 <FormControl sx={{ mt: 2,  width:"48%" }} variant="outlined" >
             <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            type="text"
              name="name"
            label="name"
             value={registerFormik.values.name}
             onChange={registerFormik.handleChange}
             onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.name && registerFormik.touched.name? <Typography color="red">{registerFormik.errors.name}</Typography>:'' }
        </FormControl>
                 <FormControl sx={{ mt: 2,  width:"48%",ml:2 }} variant="outlined" >
             <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
              name="email"
            label="email"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
           {registerFormik.errors.email && registerFormik.touched.email? <Typography color="red">{registerFormik.errors.email}</Typography>:'' }

        </FormControl>
        <FormControl sx={{ my: 3  }}variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
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
                    {registerFormik.errors.password && registerFormik.touched.password? <Typography color="red">{registerFormik.errors.password}</Typography>:'' }

        </FormControl>
        <FormControl sx={{ mb: 3  }}variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-rePassword">re-Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-rePassword"
            type={showPassword ? 'text' : 'password'}
            name="rePassword"
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
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
            label="re-Password"
          />
                    {registerFormik.errors.rePassword && registerFormik.touched.rePassword? <Typography color="red">{registerFormik.errors.rePassword}</Typography>:'' }

        </FormControl>
           <input type="date" style={{padding:"10px",display:"block",backgroundColor:"white" ,width:"100%",borderRadius:"6px",color:'black',border:"1px solid gray",outline:"none"}}
           name='dateOfBirth'
           value={registerFormik.values.dateOfBirth}
           onChange={registerFormik.handleChange}
           onBlur={registerFormik.handleBlur}
           />
           {registerFormik.errors.dateOfBirth && registerFormik.touched.dateOfBirth? <Typography color="red">{registerFormik.errors.dateOfBirth}</Typography>:'' }

   <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-gender" sx={{color:'#1565c0',mt:2}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-gender"
        name="gender"
        value={registerFormik.values.gender}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        
      </RadioGroup>
      {registerFormik.errors.gender && registerFormik.touched.gender? <Typography color="red">{registerFormik.errors.gender}</Typography>:'' }

    </FormControl>
<Button variant="outlined" type='submit' fullWidth sx={{":hover":{
          backgroundColor:'#1565C0',
          color:"white",
        },transition:"0.5s all"}}>{registerReducer.isLoading?<CircularProgress sx={{color:"white"}} />:'Register'}</Button>
                 </form>
          </Paper>
    </Container>
    </>
  )
}
