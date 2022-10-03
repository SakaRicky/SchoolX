import { NewStudent, Student } from "types";
import axios from "axios";

const baseURL = process.env.HOST;

export interface ReturnedStudent extends Student {
	student_class: {
		className: string;
	};
}

export const saveStudent = async (
	newStudent: NewStudent
): Promise<ReturnedStudent> => {
	try {
		const { data: res } = await axios.post<ReturnedStudent>(
			`${baseURL}students`,
			newStudent
		);
		return res;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getStudent = async (id: string): Promise<ReturnedStudent> => {
	const { data: res } = await axios.get<ReturnedStudent>(
		`${baseURL}students/${id}`
	);
	return res;
};

export const updateStudent = async (
	student: Student
): Promise<ReturnedStudent> => {
	try {
		const { data: res } = await axios.put<ReturnedStudent>(
			`${baseURL}students/`,
			student
		);
		return res;
	} catch (error: any) {
		throw new Error(error.response.data.error);
	}
};
