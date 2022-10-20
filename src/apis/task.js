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

export const updateTask=(id,status)=>{
    console.log()
    return axios.patch(`${HOST}/task`,{
        data:{
            id,status
        }
    })
}
