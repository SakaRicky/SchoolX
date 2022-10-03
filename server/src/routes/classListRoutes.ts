import express, { Router } from "express";
// import { Student } from 'types';

export const classListsRouter: Router = express.Router();

classListsRouter.get("/", (_req, res) => {
	res.json("This route should return class lists");
});
