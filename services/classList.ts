import { Student } from "types";
import axios from "axios";
import { ClassListType } from "types";


const baseURL = process.env.HOST;

const getClassList = async (id: string) => {    
    const {data: classList} = await axios.get<ClassListType>(`${baseURL}classlists/${id}`);
    return classList;
}

const getAllClassLists = async () => {    
    const {data: classlists} = await axios.get<ClassListType[]>(`${baseURL}classlists`);
    return classlists;
}

const classListServices = {
    getClassList,
    getAllClassLists
}

export default classListServices;