import express, { NextFunction, Request, Response, Router } from "express";
import models from "../models";

export const sequencesRouter: Router = express.Router();
const Sequence = models.Sequence;

sequencesRouter.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await Sequence.findAll({
				attributes: { exclude: ["id"] },
			});
			return res.json(students);
		} catch (error) {
			next(error);
		}
	}
); // using as request handler so that es-lint no-misused-promises should cold down

sequencesRouter.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const student = await Sequence.findOne({
				attributes: { exclude: ["studentClassId"] },
				where: { id: req.params.id },
			});

			res.json(student);
		} catch (error) {
			next(error);
		}
	}
);
