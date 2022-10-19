import axios from "axios";
import { HOST } from "../constants"

export const createTask=(data)=>{
    return axios.post(`${HOST}/task`,{
        ...data
    })
}

export const getAllTasks=()=>{
    return axios.get(`${HOST}/tasks`)
}