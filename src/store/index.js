import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import UserReducer from "../reducers/auth";
import TaskReducer from '../reducers/task'

const reducer=combineReducers({
    UserReducer,
    TaskReducer
},applyMiddleware(thunk))

export default configureStore({
    reducer
})