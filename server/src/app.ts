import express from "express";
import cors from "cors";

import {
	teachersRouter,
	studentsRouter,
	subjectsRouter,
	classesRouter,
	classListsRouter,
	marksRouter,
	loginRouter,
	usersRouter,
	sequencesRouter,
} from "./routes";

import {
	requestLogger,
	unknownEndpoint,
	errorHandler,
} from "./utils/middlewares";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
	origin: allowedOrigins,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());
app.use(requestLogger);

app.use("/api/students", studentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/subjects", subjectsRouter);
app.use("/api/classes", classesRouter);
app.use("/api/classlists", classListsRouter);
app.use("/api/marks", marksRouter);
app.use("/api/login", loginRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/sequences", sequencesRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

export default app;
