import axios from "axios";
import { ClassListType, ClassType } from "types";


const baseURL = process.env.HOST;

const getClassList = async (id: string) => {    
    const {data: classList} = await axios.get<ClassListType>(`${baseURL}classlists/${id}`);
    return classList;
}

const getAllClassLists = async () => {    
    const {data: classLists} = await axios.get<ClassListType[]>(`${baseURL}classes`);
    return classLists;
}

const getAllClasses = async () => {    
    const {data: classes} = await axios.get<ClassType[]>(`${baseURL}classes`);
    return classes;
}

const classListServices = {
    getClassList,
    getAllClassLists,
    getAllClasses
}

export default classListServices;