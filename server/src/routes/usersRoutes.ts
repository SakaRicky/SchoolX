import express, { Router } from "express";
import models from "../models";
import { NewUserAttributes } from "types";
import bcrypt from "bcrypt";
import { toEditedUser, toNewUser } from "./utils";

export const usersRouter: Router = express.Router();

const User = models.User;
const Teacher = models.Teacher;
// const Subject = models.Subject;
const Role = models.Role;
// const StudentClass = models.StudentClass;

usersRouter.get("/", async (_req, res) => {
	const allUsers = await User.findAll({
		attributes: { exclude: ["passwordHash"] },
		// include: [
		// 	{
		// 		model: Role,
		// 		attributes: ["name"],
		// 	},
		// ],
	});

	// const roles

	res.json(allUsers);
});

usersRouter.get("/:id", async (req, res) => {
	const userID: string = req.params.id;

	const userFound = await User.findByPk(userID, {
		attributes: { exclude: ["passwordHash"] },
		include: {
			model: Teacher,
			// attributes: ["id"],
		},
	});

	if (!userFound) {
		return res.status(404).send("User not found");
	} else {
		// to prevent TypeError: Converting circular structure to JSON
		const userToReturn = JSON.parse(JSON.stringify(userFound));
		const roles = await userFound.getRoles();
		// console.log("roles: ", roles);
		const teacher = await Teacher.findByPk(userToReturn.teacher.id);
		const subjects = await teacher?.getSubjects();

		res.json({
			...userToReturn,
			roles: JSON.parse(JSON.stringify(roles)),
			subjects: subjects,
		});
	}
});

usersRouter.post("/", async (req, res) => {
	try {
		const newUser: NewUserAttributes = toNewUser(req.body);

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

		const savedUser = await User.create({
			...newUser,
			passwordHash: passwordHash,
		});

		await savedUser.setRoles(newUser.roles);

		const teacher = await Teacher.create({ userId: savedUser.id });

		await teacher.setSubjects(newUser.subjectIds);

		await savedUser.getRoles();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newSavedUser = JSON.parse(JSON.stringify(savedUser));
		delete newSavedUser.passwordHash;

		res.json(savedUser);
	} catch (error) {
		console.log(error);
	}
});

usersRouter.delete("/:id", async (req, res) => {
	const userIdToDelete = req.params.id;

	const userFound = await User.findByPk(userIdToDelete, {
		include: {
			model: Role,
			attributes: ["id"],
		},
	});

	if (!userFound) {
		return res.status(404).json({ message: "user not found" });
	} else {
		const deletedUser = await userFound.destroy();

		res.json(deletedUser);
	}
});

usersRouter.put("/:id", async (req, res) => {
	const userBody = toEditedUser(req.body);

	const userFound = await User.findByPk(userBody.id);

	if (!userFound) {
		return res.status(404).json({ message: "User not found" });
	} else {
		userFound.set({
			firstName: userBody.firstName,
			lastName: userBody.lastName,
			dateOfBirth: userBody.dateOfBirth,
			gender: userBody.gender,
			phone: userBody.phone,
			email: userBody.email,
		});

		await userFound.setRoles(userBody.roles);

		const updatedUser = await userFound.save();

		const roles = await userFound.getRoles();

		const teacher = await Teacher.create({ userId: userFound.id });

		await teacher.setSubjects(userBody.subjectIds);

		const returndUser: any = { ...updatedUser, roles: roles };
		delete returndUser.passwordHash;

		return res.json(returndUser);
	}
});
