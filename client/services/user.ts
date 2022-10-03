import axios from "axios";
import { NewUser, LoggedUser, User } from "types";

const baseURL = process.env.HOST;

export interface ReceivedUser extends Omit<User, "roles"> {
	roles: { code: string; id: string; name: string }[];
	subjects: { code: string; id: string; name: string }[];
}

export const saveUser = async (newUser: NewUser) => {
	try {
		const res = await axios.post(`${baseURL}users`, newUser);
		return res.data;
	} catch (error: any) {
		console.log("errror: ", error);

		throw new Error(error.response.data.error);
	}
};

// For now we get 1 and the same teacher the time to implement auth
// This method returns a user(User) for display
export const getUser = async (id: string): Promise<ReceivedUser> => {
	const { data: receivedUser } = await axios.get<ReceivedUser>(
		`${baseURL}users/${id}`
	);
	return receivedUser;
};

// For now we get 1 and the same teacher the time to implement auth
// This method returns user(User) for loggin
export const logUser = async (user: LoggedUser): Promise<LoggedUser | null> => {
	try {
		// Will later use a POST method to authenticate

		const { data: receivedUser } = await axios.post<LoggedUser>(
			`${baseURL}login`,
			user
		);

		return receivedUser;
	} catch (error: any) {
		throw new Error(error.response.data.error);
	}
};

// For now we get 1 and the same teacher the time to implement auth
export const getUsers = async (): Promise<User[]> => {
	const { data: receivedUser } = await axios.get<User[]>(`${baseURL}users`);
	return receivedUser;
};

// For now we get 1 and the same teacher the time to implement auth
export const updateUser = async (user: User): Promise<User> => {
	const { data: receivedUser } = await axios.put<any>(
		`${baseURL}users/${user.id}`,
		user
	);

	const updatedUser = receivedUser.dataValues;
	const roles = receivedUser.roles.map(
		(role: { name: string; code: string; id: string }) => role.id
	);
	updatedUser.roles = roles;

	return updatedUser;
};
