declare namespace NodeJS {
	export interface ProcessEnv {
		PORT?: string;
		NODE_ENV: "development" | "production";
		DATABASE_URL: string;
		SECRET: string;
	}
}
