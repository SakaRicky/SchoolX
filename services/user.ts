import axios from "axios";
import { NewTeacher, LoggedUser } from "types";


const baseURL = process.env.HOST;

export const saveUser = async (newUser: NewTeacher) => {
    const res = await axios.post(`${baseURL}teachers`, newUser)
    return res.data;
}

// For now we get 1 and the same teacher the time to implement auth
export const getUser = async (user: LoggedUser) => {
    const res = await axios.get(`${baseURL}teachers/1`)
    return res.data;
}