import { Sequelize } from "sequelize";
import config from "./config";

export const sequelize = new Sequelize(config.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

export const connectToDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connected to Database");
	} catch (error) {
		console.log("Error when trying to connect to database", error);
		process.exit(1);
	}

	return null;
};
