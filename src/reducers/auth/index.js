import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../apis/users";

export const fetchUsers = createAsyncThunk(
    '/users',
    async () => {
        console.log('entered users')
      const response = await getAllUsers()
      console.log(response.data,'/// Users')
      return response.data.users
    }
  )

const AuthReducer = createSlice({
    name:'AuthReducer',
    initialState:{
        user:null,
        users:[]
    },
    reducers:{
        userLogin:(state,action)=>{
            state.user=action.payload
        },
        userLogout:(state)=>{
            state.user=null
            state.users=[]
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            console.log(action.payload)
           state.users=action.payload
        })
    }
})

export const {userLogin,userLogout} = AuthReducer.actions

export default AuthReducer.reducer;