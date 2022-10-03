import express, { NextFunction, Request, Response, Router } from "express";
import {
	SequenceAttributes,
	StudentClassAttributes,
	SubjectAttributes,
} from "types";
import models from "../models";
import { toNewMark } from "./utils";

export const marksRouter: Router = express.Router();
const Mark = models.Mark;
const Student = models.Student;
const Subject = models.Subject;
const Sequence = models.Sequence;

marksRouter.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await Mark.findAll({
				attributes: {
					exclude: [
						"id",
						"studentId",
						"subjectId",
						"sequenceId",
						"createdAt",
						"updatedAt",
					],
				},
				include: [
					{
						model: Student,
						attributes: ["first_name", "last_name", "date_of_birth", "id"],
					},
					{
						model: Subject,
						attributes: ["name"],
					},
					{
						model: Sequence,
						attributes: ["name"],
					},
				],
			});
			return res.json(students);
		} catch (error) {
			next(error);
		}
	}
); // using as request handler so that es-lint no-misused-promises should cold down

marksRouter.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const student = await Mark.findOne({
				attributes: { exclude: ["studentClassId"] },
				include: {
					model: Mark,
					attributes: ["class_name"],
				},
				where: { id: req.params.id },
			});

			res.json(student);
		} catch (error) {
			next(error);
		}
	}
);

marksRouter.post("/", async (req, res, next) => {
	try {
		// type validation as we don't know the type of data coming from request
		const newMark = toNewMark(req.body);

		const student = await Student.findByPk(newMark.studentId);
		const sequence = await Sequence.findByPk(newMark.sequenceId);
		const subject = await Subject.findByPk(newMark.subjectId);

		if (!student) {
			return res.status(404).send({ error: "student don't exist" });
		}

		if (!sequence) {
			return res.status(404).send({ error: "Sequence don't exist" });
		}

		if (!subject) {
			return res.status(404).send({ error: "Sequence don't exist" });
		}

		const studentID = (student as unknown as StudentClassAttributes).id;
		const sequenceID = (sequence as unknown as SequenceAttributes).id;
		const subjectID = (subject as unknown as SubjectAttributes).id;

		const savedMark = await Mark.create({
			...newMark,
			sequenceId: sequenceID,
			subjectId: subjectID,
			studentId: studentID,
		});

		return res.json(savedMark);
	} catch (error) {
		next(error);
	}
});
