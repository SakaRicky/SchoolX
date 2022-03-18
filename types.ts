/* eslint-disable no-unused-vars */ //on Gender
export interface Student {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    className: string,
    classCode: string,
    fathersName: string,
    fathersPhone: string,
    fathersOccupation: string,
    mothersName: string,
    mothersPhone: string,
    mothersOccupation: string
}

export interface StudentOnClassList extends Student {
    number: number
}

export interface StudentOnMarksEntry {
    id: string, // for now used as matricule
    names: string,
    marks: number
    
}

export interface Teacher {
    id: string,
    subject: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    email?: string,
    phone: number | string
}

export interface LoggedUser {
    email: string,
    password?: string,
    remember?: boolean
    name?: string,
    token?: string
}

export type NewStudent = Omit<Student, 'id' | 'class_code'>;

export type NewTeacher = Omit<Teacher, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type Color = 'success' | 'info' | 'warning' | 'error' | undefined;
export interface Notify {
    isOpen : boolean,
    message: string,
    type: Color
}

export interface ClassListType {
    id: string,
    name: string,
    students: Student[]
}

export interface ClassType {
    id: string,
    code: string,
    name: string
}

export interface MarksEntryListType {
    id: string,
    nameOfClass: string,
    students: StudentOnMarksEntry[]
}

export interface Subject {
    id: string,
    code: string,
    name: string
}