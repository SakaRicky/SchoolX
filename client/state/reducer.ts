import { LoggedUser, Notification } from "types";
import { State } from "state";
import { SET_USER, SET_NOTIFICATION } from "./stateTypes";

export type Action =
	| {
			type: "SET_USER";
			payload: LoggedUser;
	  }
	| {
			type: "SET_NOTIFICATION";
			payload: Notification | null;
	  };

export const setUser = (user: LoggedUser): Action => {
	return { type: "SET_USER", payload: user };
};

export const setNotification = (notification: Notification | null): Action => {
	return { type: "SET_NOTIFICATION", payload: notification };
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload as LoggedUser,
			};

		case "SET_NOTIFICATION":
			return {
				...state,
				notification: action.payload as Notification,
			};

		default:
			return state;
	}
};
