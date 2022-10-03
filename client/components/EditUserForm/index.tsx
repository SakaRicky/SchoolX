import { useState, useEffect } from "react";
import { Theme } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { ClassType, User, NewUser } from "types";
import { makeStyles } from "@material-ui/styles";
import {
	TextFieldWrapper,
	DatePickerWrapper,
	RadioWrapper,
	ButtonWrapper,
	CheckBoxWrapper,
} from "components/FormUi";
import { getAllClasses } from "services";
import styles from "styles/editForm.module.scss";

interface EditFormProps {
	user: User;
	handleUpdateUser: (teacher: User) => void;
	handleUserDiscard: () => void;
}

interface EditUser extends NewUser {
	teacher?: boolean;
	VP?: boolean;
	P?: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			marginTop: theme.spacing(8),
		},
		formWrapper: {
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(8),
		},
		submit: {
			display: "flex",
			justifyContent: "space-around",
			margin: theme.spacing(2),
		},
		title: {
			display: "flex",
			justifyContent: "center",
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(5),
		},
		checkboxes: {
			display: "block",
		},
		h4: {
			margin: "0.2rem 0",
			fontSize: "1rem",
			color: theme.palette.myGrey[600],
		},
	};
});

export const EditUserForm = ({
	user,
	handleUpdateUser,
	handleUserDiscard,
}: EditFormProps) => {
	const [allClasses, setAllClasses] = useState<ClassType[]>([]);
	const classes = useStyles();

	const fetchClasses = async () => {
		try {
			const allClasses: ClassType[] = await getAllClasses();
			setAllClasses(allClasses);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClasses();
	}, []);

	const INITIAL_FORM_STATE: EditUser = {
		firstName: user.firstName,
		lastName: user.lastName,
		dateOfBirth: user.dateOfBirth,
		gender: user.gender,
		phone: user.phone,
		subjectIds: [0],
		roles: user.roles,
		teacher: user.roles.includes(3),
		VP: user.roles.includes(2),
		P: user.roles.includes(1),
	};

	const FORM_VALIDATION = yup.object().shape({
		firstName: yup.string().required("Required"),
		lastName: yup.string().required("Required"),
		dateOfBirth: yup.date().required(),
		gender: yup.string().required("Please enter the gender"),
	});

	const handleSubmit = (values: NewUser) => {
		const userToUpdate = {
			...values,
			id: user.id,
		};
		handleUpdateUser(userToUpdate);
	};

	const handleDiscard = () => {
		handleUserDiscard();
	};

	console.log("user in EditUserForm: ", user);

	return (
		<div className={styles.root}>
			<Grid container>
				<Container className={classes.title} maxWidth="md">
					<Typography variant="h5">Edit Student</Typography>
				</Container>
				<Container maxWidth="md">
					<div>
						<Formik
							initialValues={{
								...INITIAL_FORM_STATE,
							}}
							validationSchema={FORM_VALIDATION}
							onSubmit={values => {
								const newRoles: number[] = [];
								const editedTeacher = {
									firstName: values.firstName,
									lastName: values.lastName,
									dateOfBirth: values.dateOfBirth,
									gender: values.gender,
									phone: values.phone,
									subjectIds: [0],
								};
								if (values.teacher) {
									newRoles.push(3);
								}
								if (values.VP) {
									newRoles.push(2);
								}
								if (values.P) {
									newRoles.push(1);
								}

								handleSubmit({ ...editedTeacher, roles: newRoles });
							}}
						>
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<TextFieldWrapper
											name="firstName"
											label="First Name"
											variant="outlined"
										/>
									</Grid>

									<Grid item xs={6}>
										<TextFieldWrapper
											name="lastName"
											label="Last Name"
											variant="outlined"
										/>
									</Grid>

									<Grid item xs={12} md={6}>
										<DatePickerWrapper
											name="dateOfBirth"
											label="Date of Birth"
										/>
									</Grid>

									<Grid item xs={12} md={6}>
										<RadioWrapper name="gender" />
									</Grid>
									<Grid item xs={12}>
										<h4 className={classes.h4}>Roles</h4>
										<div className={classes.checkboxes}>
											<CheckBoxWrapper name="teacher" label="Teacher" />
											<CheckBoxWrapper name="VP" label="Vice Principal" />
											<CheckBoxWrapper name="P" label="Principal" />
										</div>
									</Grid>

									<Grid item xs={12} md={6}>
										<TextFieldWrapper
											name="phone"
											label="Phone Number"
											variant="outlined"
										/>
									</Grid>
								</Grid>
								<div className={classes.submit}>
									<ButtonWrapper color="primary">Update</ButtonWrapper>

									<div onClick={handleDiscard}>
										<ButtonWrapper cancel color="secondary">
											Discard
										</ButtonWrapper>
									</div>
								</div>
							</Form>
						</Formik>
					</div>
				</Container>
				<Grid item xs={12}></Grid>
			</Grid>
		</div>
	);
};
