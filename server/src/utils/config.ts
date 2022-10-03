import "dotenv/config";

const config = {
	PORT: process.env.PORT || 5000,
	DATABASE_URL: process.env.DATABASE_URL || "",
	SECRET: process.env.SECRET,
};

export default config;
