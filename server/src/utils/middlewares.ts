import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ValidationError } from "sequelize";

export const requestLogger = (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	console.log("Method: ", request.method);
	console.log("Path: ", request.path);
	console.log("Body: ", request.body);
	console.log("---------");
	next();
};

export const unknownEndpoint = (_request: Request, response: Response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler: ErrorRequestHandler = (
	error,
	_request,
	response,
	next
) => {
	console.log(error);

	if (error instanceof ValidationError) {
		console.log("Inside validation error");

		return response.status(400).send({ message: error.message });
	}

	if (error instanceof Error) {
		console.log("Error happened with message: ", error.message);

		return response.status(400).send({ error: error.message });
	}

	// this is node way to handle exception that were not caught. It prevents the server from crashing
	process.on("uncaughtException", error => {
		console.error("There was an uncaught error", error);
		process.exit(1); // mandatory (as per the Node.js docs)
	});

	next(error);
};
