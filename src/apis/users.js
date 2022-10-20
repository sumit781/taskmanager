import axios from "axios"
import { HOST } from "../constants"


export const getAllUsers=()=>{
    return axios.get(`${HOST}/users`)
}