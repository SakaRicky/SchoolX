import express, { Router } from "express";
import models from "../models";
// import { toEditTeacher } from "./utils";

export const teachersRouter: Router = express.Router();

const Teacher = models.Teacher;
const User = models.User;
const Subject = models.Subject;
const StudentClass = models.StudentClass;

teachersRouter.get("/", async (_req, res) => {
	const allTeachers = await Teacher.findAll({
		attributes: { exclude: ["passwordHash"] },
		include: [
			{
				model: User,
				attributes: ["first_name", "last_name"],
				// as: "User",
			},
			{
				model: StudentClass,
				attributes: ["class_name"],
			},
		],
	});

	res.json(allTeachers);
});

teachersRouter.get("/:id", async (req, res) => {
	const teacherID: string = req.params.id;

	const teacherFound = await Teacher.findByPk(teacherID, {
		attributes: { exclude: ["passwordHash"] },
		include: {
			model: Subject,
		},
	});

	if (!teacherFound) {
		return res.status(404).send("Teacher not found");
	} else {
		res.json(teacherFound);
	}
});

// teachersRouter.post("/", async (req, res) => {
// 	const newTeacher: NewTeacherAttributes = toNewTeacher(req.body);

// 	const saltRounds = 10;
// 	const passwordHash = await bcrypt.hash(newTeacher.password, saltRounds);

// 	const savedTeacher = await Teacher.create({
// 		...newTeacher,
// 		passwordHash: passwordHash,
// 	});

// 	const addedSubjects = await savedTeacher.addSubjects(newTeacher.subjectIds);

// 	console.log(addedSubjects);

// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// 	const newSavedTeacher = JSON.parse(JSON.stringify(savedTeacher));
// 	delete newSavedTeacher.passwordHash;

// 	res.json(newSavedTeacher);
// });

teachersRouter.delete("/:id", async (req, res) => {
	const teacherIdToDelete = req.params.id;

	const teacherFound = await Teacher.findByPk(teacherIdToDelete);

	if (teacherFound === null) {
		return res.status(404).json({ message: "teacher not found" });
	} else {
		const deletedTeacher = await teacherFound.destroy();

		res.json(deletedTeacher);
	}
});

// teachersRouter.put("/:id", async (req, res) => {
// 	const teacherIdToUpdate = req.params.id;

// 	const teacherBody = toEditTeacher(req.body);

// 	const teacherFound = await Teacher.findByPk(teacherIdToUpdate, {
// 		include: [
// 			{
// 				model: Subject,
// 				attributes: ["name"],
// 			},
// 			{
// 				model: StudentClass,
// 				attributes: ["class_name"],
// 			},
// 		],
// 	});

// 	if (!teacherFound) {
// 		return res.status(404).json({ message: "Teacher not found" });
// 	} else {
// 		teacherFound.set({
// 			firstName: teacherBody.firstName,
// 			lastName: teacherBody.lastName,
// 			dateOfBirth: teacherBody.dateOfBirth,
// 			gender: teacherBody.gender,
// 			phone: teacherBody.phone,
// 			email: teacherBody.email,
// 		});

// 		const updatedTeacher = await teacherFound.save();

// 		return res.json(updatedTeacher);
// 	}
// });
