import { useState, useEffect } from "react";
import { Button, Theme } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { NewUser, Subject } from "types";
import { makeStyles } from "@material-ui/styles";
import {
	TextFieldWrapper,
	DatePickerWrapper,
	RadioWrapper,
	CheckBoxWrapper,
} from "components/FormUi";
import { getAllSubjects } from "services";
import { forwardRef } from "react";

interface AddTeacherProps {
	handleSubmit: (values: NewUser) => void;
	handleCloseModal: () => void;
}

// interface NewFormUser extends NewUser {
// 	teacher?: boolean;
// 	VP?: boolean;
// 	P?: boolean;
// 	?: boolean;
// 	VP?: boolean;
// 	P?: boolean;
// }

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			maxWidth: "900px",
			margin: "0 auto",
			marginTop: theme.spacing(10),
			backgroundColor: theme.palette.myGrey[100],
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

// eslint-disable-next-line react/display-name
export const AddTeacherForm = forwardRef<HTMLDivElement, AddTeacherProps>(
	({ handleSubmit, handleCloseModal }, ref) => {
		const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
		const classes = useStyles();
		useEffect(() => {
			const fetchSubjects = async () => {
				try {
					const allSubjects: Subject[] = await getAllSubjects();
					setAllSubjects(allSubjects);
				} catch (error: any) {
					console.log(error);
				}
			};
			fetchSubjects();
		}, []);

		const INITIAL_FORM_STATE: any = {
			firstName: "",
			lastName: "",
			subjectIds: [],
			dateOfBirth: new Date(),
			gender: "",
			email: "",
			phone: "",
			password: "",
			roles: [],
			teacher: false,
			VP: false,
			P: false,
		};

		const FORM_VALIDATION = yup.object().shape({
			firstName: yup.string().required("Required"),
			lastName: yup.string().required("Required"),
			dateOfBirth: yup.date().required(),
			gender: yup.string().required("Please enter the gender"),
			email: yup.string().email("Invalid email"),
			phone: yup.number().typeError("Please enter a valid phone number"),
			subject: yup.string().typeError("Please select a subject"),
			password: yup.string().typeError("Please enter a password"),
		});

		return (
			<div ref={ref}>
				<Grid container className={classes.root}>
					<Container className={classes.title} maxWidth="md">
						<Typography variant="h5">Add New Teacher</Typography>
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
									const subjectIds: number[] = [];
									const newUser = {
										firstName: values.firstName,
										lastName: values.lastName,
										dateOfBirth: values.dateOfBirth,
										gender: values.gender,
										phone: values.phone,
										password: values.password,
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
									allSubjects.forEach(subject => {
										if (values[subject.name]) {
											subjectIds.push(parseInt(subject.id));
										}
									});

									handleSubmit({
										...newUser,
										roles: newRoles,
										subjectIds: subjectIds,
									});
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

										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="email"
												label="Email Address"
												variant="outlined"
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="phone"
												label="Phone Number"
												variant="outlined"
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<Typography variant="h6">User&apos;s Password</Typography>
											<TextFieldWrapper
												name="password"
												label="Password"
												variant="outlined"
											/>
										</Grid>

										<Grid item xs={12}>
											<Typography variant="h6">User&apos;s Role</Typography>
											<div className={classes.checkboxes}>
												<CheckBoxWrapper name="teacher" label="Teacher" />
												<CheckBoxWrapper name="VP" label="Vice Principal" />
												<CheckBoxWrapper name="P" label="Principal" />
											</div>
										</Grid>

										<Grid item xs={12}>
											<Typography variant="h6">
												Teacher&apos;s Subject
											</Typography>
											<div className={classes.checkboxes}>
												{allSubjects.map(subject => {
													return (
														<CheckBoxWrapper
															key={subject.id}
															name={subject.name}
															label={subject.name}
														/>
													);
												})}
											</div>
										</Grid>
									</Grid>

									<div className={classes.submit}>
										<Button color="primary" variant="contained" type="submit">
											Submit
										</Button>

										<Button
											color="secondary"
											variant="contained"
											onClick={handleCloseModal}
										>
											Cancel
										</Button>
									</div>
								</Form>
							</Formik>
						</div>
					</Container>
					<Grid item xs={12}></Grid>
				</Grid>
			</div>
		);
	}
);
