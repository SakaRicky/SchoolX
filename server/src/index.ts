import http from "http";
import app from "./app";
import config from "./utils/config";
import { connectToDB } from "./utils/db";

const server = http.createServer(app);

const startServer = async () => {
	await connectToDB();
	server.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
};

void startServer();
