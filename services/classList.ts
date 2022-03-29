import axios from "axios";
import { ClassListType, ClassType, MarksEntryListType } from "types";


const baseURL = process.env.HOST;

export const getClassList = async (id: string) => {  
    const {data: classList} = await axios.get<ClassListType>(`${baseURL}classlists/${id}`);
    return classList;
};

export const getMarkEntryList = async (seq: string, id: string) => {    
    const {data: marksEntryList} = await axios.get<MarksEntryListType>(`${baseURL}sequence/${seq+id}`);
    return marksEntryList;
};

export const saveMarks = async (seqClass: MarksEntryListType) => {    
    const {data: savedMarks} = await axios.patch<MarksEntryListType>(`${baseURL}sequence/${seqClass.id}`, seqClass);
    console.log(savedMarks); 
    return savedMarks;
};

export const getAllClassLists = async () => {    
    const {data: classLists} = await axios.get<ClassListType[]>(`${baseURL}classes`);
    return classLists;
};

export const getAllClasses = async (): Promise<ClassType[]> => {        
    const {data: classes} = await axios.get<ClassType[]>(`${baseURL}classes`);
    return classes;
};
