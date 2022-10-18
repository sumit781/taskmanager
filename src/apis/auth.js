import axios from "axios"
import { HOST } from "../constants"


export const login=(email,password)=>{
    return axios.post(`${HOST}/auth`,{
        emailId:email,
        password
    })
}