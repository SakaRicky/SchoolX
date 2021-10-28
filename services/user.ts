import { NewStudent } from "types";
import axios from "axios";
import { NewTeacher, LoggedUser } from "types";


const baseURL = 'http://localhost:5000/';

const saveTeacher = async (newTeacher: NewTeacher) => {
    const res = await axios.post(`${baseURL}teachers`, newTeacher)
    return res.data;
}

// For now we get 1 and the same teacher the time to implement auth
const getTeacher = async (teacher: LoggedUser) => {
    const res = await axios.get(`${baseURL}teachers/1`)
    return res.data;
}


const teacherServices = {
    saveTeacher,
    getTeacher
}

export default teacherServices