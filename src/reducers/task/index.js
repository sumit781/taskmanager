import { createSlice } from "@reduxjs/toolkit";


const AuthReducer = createSlice({
    name:'TaskReducer',
    initialState:{
        tasks:null
    },
    reducers:{
        getAllTask:(state,action)=>{
        },
        userLogout:(state)=>{
            state.user=null
        }
    }
})

export const {userLogin,userLogout} = AuthReducer.actions

export default AuthReducer.reducer;