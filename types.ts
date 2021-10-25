export interface Student {
    id: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender: string,
    class: string,
    class_code: string,
    fathers_name: string,
    fathers_phone: string,
    fathers_occupation: string,
    mothers_name: string,
    mothers_phone: string,
    mothers_occupation: string
}

export interface Teacher {
    id: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender: string,
    email?: string,
    phone: number | string
}

export interface LoggedUser {
    email: string,
<<<<<<< HEAD
    password: string,
    remember: boolean
=======
    name: string,
    token?: string
>>>>>>> feat: imported the state and made new type
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
    message: string | any,
    type: Color
}

export interface ClassListType {
    id: string,
    name: string,
    students: Student[]
}