/* eslint-disable no-unused-vars */ //on Gender
export interface Student {
	id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	className: string;
	classCode: string; // just for now so routing works
	fathersName: string;
	fathersPhone: string;
	fathersOccupation: string;
	mothersName: string;
	mothersPhone: string;
	mothersOccupation: string;
}

export interface StudentOnClassList extends Student {
	number: number;
}

export interface StudentOnMarksEntry {
	id: string; // for now used as matricule
	names: string;
	marks: number;
}

export interface User {
	id: string;
	subjectIds: number[];
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	email?: string;
	phone: number | string;
	roles: number[];
}

export interface LoggedUser {
	email: string;
	password?: string;
	remember?: boolean;
	names?: string;
	token?: string;
}

export type NewStudent = Omit<Student, "id" | "className">;

export type NewUser = Omit<User, "id">;

export enum Gender {
	male = "Male",
	female = "Female",
}

export type Color = "success" | "info" | "warning" | "error" | undefined;
export interface Notification {
	isOpen: boolean;
	message: string;
	type: Color;
}

export interface ClassListType {
	id: string;
	name: string;
	students: Student[];
}

export interface ClassType {
	classCode: string;
	className: string;
	students: Student[];
}

export interface MarksEntryListType {
	id: string;
	nameOfClass: string;
	students: StudentOnMarksEntry[];
}

export interface Subject {
	id: string;
	code: string;
	name: string;
}
