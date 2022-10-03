import { Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import models from "../models";
import { toLogin } from "./utils";
import config from "../utils/config";

export const loginRouter: Router = Router();

// const Teacher = models.Teacher;
const User = models.User;

// Used to login the user
// needs user email, password
// return auth token
loginRouter.post("/", async (req, res) => {
	const body = toLogin(req.body);

	const user = await User.findOne({
		where: {
			email: body.email,
		},
	});

	// check if a user was found, if no passwordCorrect will be false
	// if yes, verify if the password match with the hashed password
	const passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash);

	console.log("passwordCorrect: ", passwordCorrect);
	// console.log("passwordCorrect: ", passwordCorrect);

	// If there is no user and no password, auth fail and return message to indicate that
	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: "invalid username or password",
		});
	}

	// // The token will be created using the id and username
	// // They will be useful later when a request comes with a token and the server needs confirm the person
	const tokenForUser = {
		username: user.email,
		id: user.id,
	};

	const SECRET = config.SECRET as Secret;

	// Generate the token using the id and username
	const token = jwt.sign(tokenForUser, SECRET);

	return res.status(200).send({
		token,
		email: user.email,
		names: user.firstName + " " + user.lastName,
	});
});
