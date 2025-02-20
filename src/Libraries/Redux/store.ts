import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { registerReducer } from './registerSlice'
import { postReducer } from './postSlice'
import { createPostReducer } from './createPostSlice'



export const store=configureStore({
    reducer:{
        authReducer,
        registerReducer,
        postReducer,
        createPostReducer,
    }
})

export type dispatchType=typeof store.dispatch
export type storeType=ReturnType<typeof store.getState >