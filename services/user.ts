import axios from "axios";
import { NewTeacher, LoggedUser, Teacher } from "types";


const baseURL = process.env.HOST;

export const saveUser = async (newUser: NewTeacher) => {
    const res = await axios.post(`${baseURL}teachers`, newUser)
    return res.data;
}

// For now we get 1 and the same teacher the time to implement auth
export const getUser = async (id: string): Promise<Teacher> => {
    const {data: receivedTeacher} = await axios.get<Teacher>(`${baseURL}teachers/${id}`)        
    return receivedTeacher;
}

// For now we get 1 and the same teacher the time to implement auth
export const logUser = async (user: LoggedUser): Promise<Teacher> => {
    const {data: receivedTeacher} = await axios.get<Teacher>(`${baseURL}teachers/${1}`)    
    
    return receivedTeacher;
}

// For now we get 1 and the same teacher the time to implement auth
export const getUsers = async (): Promise<Teacher[]> => {
    const {data: receivedTeacher} = await axios.get<Teacher[]>(`${baseURL}teachers`)    
    return receivedTeacher;
}

// For now we get 1 and the same teacher the time to implement auth
export const updateUser = async (teacher: Teacher): Promise<Teacher> => {
    const {data: receivedTeacher} = await axios.patch<Teacher>(`${baseURL}teachers/${teacher.id}`, teacher)    
    return receivedTeacher;
}