import { NewStudent } from "types";
import axios from "axios";


const baseURL = process.env.HOST;

const saveStudent = async (newStudent: NewStudent) => {
    const res = await axios.post(`${baseURL}students`, newStudent)
    return res.data;
}

const studentServices = {
    saveStudent
}

export default studentServices