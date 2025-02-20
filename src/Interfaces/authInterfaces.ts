export interface LoginInterface{

    token:null|string,
    isLoading:boolean,
    isError:boolean,
    errorMessage:null|string
    
}

export interface ActionInterface{
    payload:PayloadInterface,
    type:string,
    meta:any
}
interface PayloadInterface{
    data?:LoginInterface|SignUpDataInterface,
    error?:string,
    response?:any,
    token?:string
}
interface SignupDataInterface extends LoginDataInterface{
       name:string,
       rePassword:string,
       dateOfBirth:string,
       gender:string
}

export interface LoginDataInterface{
    email:string,
    password:string
}
export interface SignUpDataInterface{
    name:string,
    email:string,
    password:string,
    rePassword:string,
    gender:string,
    dateOfBirth:string,
    error?:string
}
export interface SignUpInterface{
     isLoading:boolean,
     error:null|string,

}