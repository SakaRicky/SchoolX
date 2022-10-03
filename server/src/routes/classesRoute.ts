import express, { NextFunction, Request, Response, Router } from "express";

import models from "../models";
import { toNewStudentClass } from "./utils";

export const classesRouter: Router = express.Router();

const StudentClass = models.StudentClass;
const Student = models.Student;

classesRouter.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const classes = await StudentClass.findAll({
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: {
					model: Student,
					attributes: [
						"id",
						["first_name", "firstName"],
						["last_name", "lastName"],
						["date_of_birth", "dateOfBirth"],
						"gender",
						["fathers_name", "fathersName"],
						["fathers_phone", "fathersPhone"],
					],
				},
			});
			return res.json(classes);
		} catch (error) {
			next(error);
		}
	}
);

classesRouter.get(
	"/:classCode",
	async (req: Request, res: Response, next: NextFunction) => {
		const classCode = req.params;
		console.log("classCode: ", classCode);

		try {
			const classes = await StudentClass.findByPk(req.params.id);
			return res.json(classes);
		} catch (error) {
			next(error);
		}
	}
);

// TODO: prevent creating a class that already exist
classesRouter.post(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// type validation as we don't know the type of data coming from request
			const newClass = toNewStudentClass(req.body);

			const classes = await StudentClass.create(newClass);
			return res.json(classes);
		} catch (error) {
			next(error);
		}
	}
);
