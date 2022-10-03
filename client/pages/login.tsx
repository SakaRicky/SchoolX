import {
	Avatar,
	CssBaseline,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	makeStyles,
	AppBar,
	Toolbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { logUser } from "services";
import { useRouter } from "next/router";
import { LoggedUser, Notification } from "types";
import { Form, Formik } from "formik";
import { ButtonWrapper, TextFieldWrapper, CheckBoxWrapper } from "components";
import { object, string } from "yup";
import { setNotification, setUser, useStateValue } from "state";

const useStyles = makeStyles(theme => {
	return {
		root: {
			marginTop: theme.spacing(10),
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		appToolbar: {
			display: "flex",
			justifyContent: "center",
		},
		toolbar: theme.mixins.toolbar,
	};
});

// Not fully functional as I need to implement the state using context api
const Login = () => {
	const [globalState, dispatch] = useStateValue();

	const router = useRouter();
	const classes = useStyles();

	console.log("globalState :", globalState);
	console.log("dispatch :", dispatch);

	const handleSubmit = async (data: LoggedUser) => {
		dispatch({ type: "SET_NOTIFICATION", payload: null });
		try {
			const loggedUser = await logUser(data);
			console.log("loggedUser: ", loggedUser);
			if (loggedUser) {
				console.log("User received: ", loggedUser);

				dispatch(
					setUser({
						email: loggedUser.email,
						names: loggedUser.names,
					})
				);
				dispatch(
					setNotification({
						isOpen: true,
						message: loggedUser.names || "",
						type: "success",
					})
				);
			}
			router.push("/dashboard");
		} catch (error: any) {
			console.log(error);

			dispatch(
				setNotification({
					isOpen: true,
					message: error.message,
					type: "error",
				})
			);
		}
	};

	const INITIAL_FORM_STATE: LoggedUser = {
		email: "",
		password: "",
		remember: false,
	};

	const FORM_VALIDATION = object().shape({
		email: string().email("Invalid email").required("please enter email"),
		password: string().required("password needed"),
	});

	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.appToolbar}>
					<Typography variant="h6" noWrap>
						SchoolX
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box sx={{ mt: 1 }}>
					<Formik
						initialValues={{
							...INITIAL_FORM_STATE,
						}}
						validationSchema={FORM_VALIDATION}
						onSubmit={values => {
							handleSubmit(values);
						}}
					>
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextFieldWrapper
										name="email"
										label="Email Address"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextFieldWrapper
										name="password"
										label="Password"
										fullWidth
									/>
								</Grid>
								<CheckBoxWrapper name="remember" label="Remember Me" />
								<Grid item xs={12}>
									<ButtonWrapper fullWidth color="primary">
										Sign In
									</ButtonWrapper>
								</Grid>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											Forgot password?
										</Link>
									</Grid>
								</Grid>
							</Grid>
						</Form>
					</Formik>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
