import { NewStudent, Student } from "types";
import axios from "axios";


const baseURL = process.env.HOST;

export const saveStudent = async (newStudent: NewStudent) => {
    const res = await axios.post(`${baseURL}students`, newStudent)
    return res.data;
}

export const getStudent = async (id: string) => {
    const {data: res} = await axios.get<Student>(`${baseURL}students/${id}`)
    return res;
}

export const updateStudent = async (student: Student): Promise<Student> => {
    const {data: res} = await axios.patch<Student>(`${baseURL}students/${student.id}`, student)
    return res;
}