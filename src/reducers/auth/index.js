import { createSlice } from "@reduxjs/toolkit";


const AuthReducer = createSlice({
    name:'AuthReducer',
    initialState:{
        user:null
    },
    reducers:{
        userLogin:(state,action)=>{
            state.user=action.payload
        },
        userLogout:(state)=>{
            state.user=null
        }
    }
})

export const {userLogin,userLogout} = AuthReducer.actions

export default AuthReducer.reducer;