interface BaseModel {
	id: string | number;
	description?: string;
	foodGroup?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface StudentAttributes extends BaseModel {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: Gender; // modified
	fathersName: string;
	fathersPhone: string;
	fathersOccupation: string;
	mothersName: string;
	mothersPhone: string;
	mothersOccupation: string;
	studentClassId: string | number;
}

export enum Gender {
	male = "Male",
	female = "Female",
}

export interface NewStudentAttributes
	extends Omit<StudentAttributes, "id" | "studentClassId"> {
	classCode: string; // an enum will be better here
} // don't expect to receive name from frontend, will assign it here in backend

export interface EditedStudentAttributes
	extends Omit<StudentAttributes, "studentClassId"> {
	classCode: string; // an enum will be better here
} // don't expect to receive name from frontend, will assign it here in backend

export interface StudentOnClassList extends StudentAttributes {
	number: number;
}

export interface UserAttributes extends BaseModel {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	email?: string;
	username?: string;
	phone: number | string;
	passwordHash: string;
	roles?: number[];
	subjectIds?: number[];
}

export interface NewUserAttributes
	extends Omit<UserAttributes, "id" | "passwordHash"> {
	password: string;
}

export interface EditUserAttributes
	extends Omit<UserAttributes, "password" | "passwordHash"> {}

export interface TeacherAttributes extends BaseModel {
	subjectIds?: number[];
	studentClassId?: number[];
	userId?: string;
}

export interface NewTeacherAttributes
	extends Omit<TeacherAttributes, "id" | "studentClassId" | "passwordHash"> {
	password: string;
}

export interface StudentClassAttributes extends BaseModel {
	classCode: string;
	className: string;
}

export interface NewStudentClassAttributes
	extends Omit<StudentClassAttributes, "id"> {}

export interface ClassListType extends BaseModel {
	name: string;
	students: StudentOnClassList[];
}

export interface MarkAttributes extends BaseModel {
	// will have to use enum
	sequenceId: string | number;
	studentId: string | number;
	subjectId: string | number;
	value: number;
}

export interface NewMarkAttributes extends Omit<MarkAttributes, "id"> {}

export interface SequenceAttributes extends BaseModel {
	// will have to use enum
	name: string;
}

export interface SubjectAttributes extends BaseModel {
	// will have to use enum
	// id: number;
	name: string;
	code: string;
	// studentClassId: number;
}

export interface RoleAttributes extends BaseModel {
	// will have to use enum
	name: string;
	code: string;
	// userId: string | number;
}

export interface LoginAttributes {
	username?: string;
	email?: string;
	password: string;
}
