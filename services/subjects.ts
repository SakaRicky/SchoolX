import axios from "axios";
import { Subject } from "types";


const baseURL = process.env.HOST;

export const getAllSubjects = async (): Promise<Subject[]> => {  
    console.log(`${baseURL}subjects`);
      
    const {data: subjetcs} = await axios.get<Subject[]>(`${baseURL}subjects`);
    return subjetcs;
};
