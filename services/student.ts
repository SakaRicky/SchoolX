import { NewStudent } from "types";
import axios from "axios";


const baseURL = 'http://localhost:5000/';

const saveStudent = async (newStudent: NewStudent) => {
    const res = await axios.post(`${baseURL}students`, newStudent)
    console.log(res);
    
}

const studentServices = {
    saveStudent
}

export default studentServices