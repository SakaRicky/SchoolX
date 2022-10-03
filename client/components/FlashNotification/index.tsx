import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { setNotification, useStateValue } from "state";

const useStyles = makeStyles(theme => ({
	root: {
		top: theme.spacing(9),
		width: "100%",
	},
}));

export const FlashNotification = () => {
	const [globalState, dispatch] = useStateValue();

	const classes = useStyles();

	const handleClose = () => {
		dispatch(setNotification(null));
	};

	const notif =
		globalState.notification !== null ? (
			<Snackbar
				className={classes.root}
				open={globalState.notification.isOpen}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				onClose={handleClose}
			>
				<Alert severity={globalState.notification.type} onClose={handleClose}>
					<AlertTitle>Success</AlertTitle>
					{globalState.notification.message}
				</Alert>
			</Snackbar>
		) : null;

	return <>{notif}</>;
};
