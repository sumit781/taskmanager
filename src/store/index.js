import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import UserReducer from "../reducers/auth";

const reducer=combineReducers({
    UserReducer,
},applyMiddleware(thunk))

export default configureStore({
    reducer
})