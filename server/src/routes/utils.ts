/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	NewStudentClassAttributes,
	Gender,
	NewStudentAttributes,
	NewMarkAttributes,
	LoginAttributes,
	NewUserAttributes,
	EditUserAttributes,
	EditedStudentAttributes,
} from "../types";

// type predicate on type unknown => string
const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

// type predicate on type unknown => number
const isNumber = (num: unknown): num is number => {
	return !isNaN(Number(num)) && !isNaN(Number(num) - 0);
};

// type predicate on type unknown => number
const isArrayNumber = (numArray: unknown): numArray is number[] => {
	let isNumberVar = true;

	if (Array.isArray(numArray)) {
		numArray.forEach(num => {
			if (!isNumber(num)) {
				isNumberVar = false;
			}
		});
	}
	return isNumberVar;
};

// type predicate on type unknown => number
// const isArrayString = (stringArray: unknown): stringArray is string[] => {
// 	let isStringVar = true;
// 	if (Array.isArray(stringArray)) {
// 		stringArray.forEach(str => {
// 			if (typeof str !== "string") {
// 				isStringVar = false;
// 			}
// 		});
// 	}
// 	return isStringVar;
// };

// const isDate = (date: unknown): date is Date => {
//     return date instanceof String;
// };

// since Gender is enum with hard coded values('male', 'female') we can
// use them directly so the code remains sync
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(gender);
};

// take param name and make sure it's type is appropriate(string)
const parseFirstName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing first name: " + name);
	}

	return name;
};

// take param name and make sure it's type is appropriate(string)
const parseLastName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing last name: " + name);
	}

	return name;
};

// take param name and make sure it's type is appropriate(string)
const parseFathersName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing fathers name: " + name);
	}

	return name;
};

// take param name and make sure it's type is appropriate(string)
const parseMothersName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing mothers name: " + name);
	}

	return name;
};

// the frontend converts the date to a string before sending so we
// take param date and make sure it's a string so we can create a new Date object
const parseDate = (date: unknown): Date => {
	if (!date || !isString(date)) {
		throw new Error("Incorrect or missing date: " + date);
	}

	const dateObject: Date = new Date(date);

	return dateObject;
};

const parseGender = (gender: unknown): Gender => {
	// shouls exist, should a string & should be in Gender enum,
	// if not throw new error
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}

	return gender;
};

const parseClassCode = (classCode: unknown): string => {
	// shouls exist and should a string, if not throw new error
	if (!classCode || !isString(classCode)) {
		throw new Error("Incorrect or missing class code: " + classCode);
	}

	// After isString, classCode passes the test and type predicate makes it of type string
	return classCode;
};

const parsePhone = (phone: unknown): string => {
	// shouls exist and should a string, if not throw new error
	if (!phone || !isString(phone)) {
		throw new Error("Incorrect or missing phone: " + phone);
	}

	// After isString, phone passes the test and type predicate makes it of type string
	return phone;
};

const parseOccupation = (occupation: unknown): string => {
	// shouls exist and should a string, if not throw new error
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation: " + occupation);
	}
	// After isString, occupation passes the test and type predicate makes it of type string
	return occupation;
};

const parseEmail = (email: unknown): string | undefined => {
	// shouls exist and should a string, if not throw new error
	if (!email || !isString(email)) {
		return "";
	}
	// After isString, occupation passes the test and type predicate makes it of type string
	return email;
};

const parseString = (str: unknown): string => {
	// shouls exist and should a string, if not throw new error
	if (!str || !isString(str)) {
		throw new Error("Incorrect or missing string: " + str);
	}
	// After isString, occupation passes the test and type predicate makes it of type string
	return str;
};

const parseNumber = (num: unknown): number => {
	if (!num || !isNumber(num)) {
		throw new Error("Incorrect or missing mark or number: " + num);
	}
	// After isString, occupation passes the test and type predicate makes it of type string
	return num;
};

const parseArrayOfNumber = (numArray: unknown): number[] => {
	if (!numArray || !isArrayNumber(numArray)) {
		console.log("numArray: ", numArray);

		throw new Error(
			"Incorrect or missing mark or Array of numbers: " + numArray
		);
	}

	// After isString, occupation passes the test and type predicate makes it of type string
	return numArray;
};

// const parseArrayOfString = (stringArray: unknown): string[] => {
// 	if (!stringArray || !isArrayString(stringArray)) {
// 		throw new Error("Incorrect or missing mark or number: " + stringArray);
// 	}

// 	// After isString, occupation passes the test and type predicate makes it of type string
// 	return stringArray;
// };

// since we are not sure of the fields recived in the req.body
// use for type validation for student on post request, to valid 1 field at a time
export const toNewStudent = (object: any): NewStudentAttributes => {
	const newStudent: NewStudentAttributes = {
		firstName: parseFirstName(object.firstName),
		lastName: parseLastName(object.lastName),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		classCode: parseClassCode(object.classCode),
		fathersName: parseFathersName(object.fathersName),
		fathersPhone: parsePhone(object.fathersPhone),
		fathersOccupation: parseOccupation(object.fathersOccupation),
		mothersName: parseMothersName(object.mothersName),
		mothersPhone: parsePhone(object.mothersPhone),
		mothersOccupation: parseOccupation(object.mothersOccupation),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return newStudent;
};

export const toEditedStudent = (object: any): EditedStudentAttributes => {
	const newStudent: EditedStudentAttributes = {
		id: parseString(object.id),
		firstName: parseFirstName(object.firstName),
		lastName: parseLastName(object.lastName),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		classCode: parseClassCode(object.classCode),
		fathersName: parseFathersName(object.fathersName),
		fathersPhone: parsePhone(object.fathersPhone),
		fathersOccupation: parseOccupation(object.fathersOccupation),
		mothersName: parseMothersName(object.mothersName),
		mothersPhone: parsePhone(object.mothersPhone),
		mothersOccupation: parseOccupation(object.mothersOccupation),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return newStudent;
};

// since we are not sure of the fields recived in the req.body
// use for type validation for student on post request, to valid 1 field at a time
export const toNewUser = (object: any): NewUserAttributes => {
	const newTeacher: NewUserAttributes = {
		firstName: parseFirstName(object.firstName),
		lastName: parseLastName(object.lastName),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		phone: parsePhone(object.phone),
		email: parseEmail(object.email),
		subjectIds: parseArrayOfNumber(object.subjectIds),
		password: parseString(object.password),
		roles: parseArrayOfNumber(object.roles),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return newTeacher;
};

export const toEditedUser = (object: any): EditUserAttributes => {
	const editTeacher: EditUserAttributes = {
		id: parseString(object.id),
		firstName: parseFirstName(object.firstName),
		lastName: parseLastName(object.lastName),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		phone: parsePhone(object.phone),
		email: parseEmail(object.email),
		subjectIds: parseArrayOfNumber(object.subjectIds),
		roles: parseArrayOfNumber(object.roles),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return editTeacher;
};

export const toNewStudentClass = (object: any): NewStudentClassAttributes => {
	const newStudentClass: NewStudentClassAttributes = {
		className: parseString(object.className),
		classCode: parseString(object.classCode),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return newStudentClass;
};

export const toNewMark = (object: any): NewMarkAttributes => {
	const newMark: NewMarkAttributes = {
		value: parseNumber(object.value),
		sequenceId: parseNumber(object.sequenceId),
		subjectId: parseNumber(object.subjectId),
		studentId: parseString(object.studentId),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return newMark;
};

export const toLogin = (object: any): LoginAttributes => {
	console.log(object);

	const login: LoginAttributes = {
		// username: parseString(object.username),
		email: parseString(object.email),
		password: parseString(object.password),
	};

	// takes an object of type any and returns an object of type NewStudent
	// this what parsing is about, taking on type and return of another type
	return login;
};
