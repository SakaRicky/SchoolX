import { NewStudent } from "types";
import axios from "axios";
import { NewTeacher } from "types";


const baseURL = 'http://localhost:5000/';

const saveTeacher = async (newTeacher: NewTeacher) => {
    const res = await axios.post(`${baseURL}teachers`, newTeacher)
    return res.data;
}

const teacherServices = {
    saveTeacher
}

export default teacherServices