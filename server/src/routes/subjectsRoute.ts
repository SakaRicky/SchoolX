import express, { Router } from "express";
import models from "../models";
// import { Student } from 'types';

export const subjectsRouter: Router = express.Router();
const Subject = models.Subject;

subjectsRouter.get("/", async (_req, res) => {
	console.log("Getting all subjects");

	const subjects = await Subject.findAll();

	console.log(JSON.stringify(subjects));

	return res.json(subjects);
});
