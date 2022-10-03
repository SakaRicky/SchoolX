interface LoggerInterface {
	messages: string;
}

const info = (messages: LoggerInterface) => {
	console.log(messages);
};

const error = (messages: LoggerInterface) => {
	console.error(messages);
};

export const logger = { info, error };
