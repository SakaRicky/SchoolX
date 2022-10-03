import express, { NextFunction, Request, Response, Router } from "express";
import { StudentClassAttributes } from "types";
import models from "../models";
// import { Student } from 'types';
import { toNewStudent, toEditedStudent } from "./utils";

export const studentsRouter: Router = express.Router();
const Student = models.Student;
const StudentClass = models.StudentClass;
const Subject = models.Subject;

studentsRouter.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await Student.findAll({
				attributes: { exclude: ["studentClassId"] },
				include: [
					{
						model: StudentClass,
						attributes: ["class_name"],
						include: [{ model: Subject, attributes: ["name", "code"] }],
					},
				],
			});
			return res.json(students);
		} catch (error) {
			next(error);
		}
	}
); // using as request handler so that es-lint no-misused-promises should cold down

studentsRouter.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const student = await Student.findOne({
				attributes: { exclude: ["studentClassId"] },
				include: [
					{
						model: StudentClass,
						attributes: ["className"],
						include: [{ model: Subject, attributes: ["name", "code"] }],
					},
				],
				where: { id: req.params.id },
			});

			res.json(student);
		} catch (error) {
			next(error);
		}
	}
);

studentsRouter.post("/", async (req, res, next) => {
	try {
		// type validation as we don't know the type of data coming from request
		const newStudent = toNewStudent(req.body);
		console.log(JSON.stringify(newStudent));

		const classOfStudent = await StudentClass.findOne({
			where: { classCode: newStudent.classCode },
		});

		if (!classOfStudent) {
			return res.json({ error: "Sorry this class don't exist" });
		}

		const classID = (classOfStudent as unknown as StudentClassAttributes).id;

		const savedStudent = await Student.create({
			...newStudent,
			studentClassId: classID,
		});

		return res.json(savedStudent);
	} catch (error) {
		next(error);
	}
});

studentsRouter.delete("/:id", async (req, res) => {
	const studentIdToDelete = req.params.id;

	const studentFound = await Student.findByPk(studentIdToDelete);

	if (studentFound === null) {
		return res.status(404).json({ message: "Student not found" });
	} else {
		await studentFound.destroy();

		return res.status(200);
	}
});

studentsRouter.put("/", async (req, res, next) => {
	console.log("Updating student");

	try {
		// type validation as we don't know the type of data coming from request
		const editedStudent = toEditedStudent(req.body);
		console.log(JSON.stringify(editedStudent));

		const classOfStudent = await StudentClass.findOne({
			where: { classCode: editedStudent.classCode },
		});

		if (!classOfStudent) {
			return res.json({ error: "Sorry this class don't exist" });
		}

		const classID = (classOfStudent as unknown as StudentClassAttributes).id;

		await Student.update(
			{
				...editedStudent,
				studentClassId: classID,
			},
			{ where: { id: editedStudent.id } }
		);

		const student = await Student.findOne({
			attributes: { exclude: ["studentClassId"] },
			include: [
				{
					model: StudentClass,
					attributes: ["className"],
					include: [{ model: Subject, attributes: ["name", "code"] }],
				},
			],
			where: { id: editedStudent.id },
		});

		return res.json(student);
	} catch (error) {
		next(error);
	}
});
