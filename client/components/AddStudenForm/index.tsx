import { useState, useEffect, forwardRef } from "react";
import { Theme } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { NewStudent, ClassType } from "types";
import { makeStyles } from "@material-ui/styles";
import {
	TextFieldWrapper,
	SelectWrapper,
	DatePickerWrapper,
	RadioWrapper,
	ButtonWrapper,
} from "components/FormUi";
import { getAllClasses } from "services";

interface AddStudentProps {
	handleSubmit: (values: NewStudent) => void;
	handleCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			maxWidth: "900px",
			margin: "0 auto",
			marginTop: theme.spacing(20),
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
	};
});

const INITIAL_FORM_STATE: NewStudent = {
	firstName: "",
	lastName: "",
	dateOfBirth: new Date(),
	gender: "",
	fathersName: "",
	fathersPhone: "",
	fathersOccupation: "",
	mothersName: "",
	mothersPhone: "",
	mothersOccupation: "",
	classCode: "",
};

const FORM_VALIDATION = yup.object().shape({
	firstName: yup.string().required("Required"),
	lastName: yup.string().required("Required"),
	dateOfBirth: yup.date().required(),
	gender: yup.string().required("Please enter the gender"),
	fathersName: yup.string().required("Please enter the father name"),
	fathersPhone: yup.number().required("Please enter a valid phone number"),
	mothersPhone: yup.number().required("Please enter a valid phone number"),
	classCode: yup.string().required("Please choose a class"),
});

// eslint-disable-next-line react/display-name
export const AddStudentForm = forwardRef<HTMLDivElement, AddStudentProps>(
	({ handleSubmit, handleCancel }, ref) => {
		const [allClasses, setAllClasses] = useState<ClassType[]>([]);
		const classes = useStyles();

		useEffect(() => {
			const fetchClasses = async () => {
				try {
					const allClasses: ClassType[] = await getAllClasses();
					setAllClasses(allClasses);
				} catch (error: any) {
					console.log(error);
				}
			};
			fetchClasses();
		}, []);
		console.log("allClasses: ", allClasses);

		return (
			<div className={classes.root} ref={ref}>
				<Grid container>
					<Container className={classes.title} maxWidth="md">
						<Typography variant="h5">Add New Student</Typography>
					</Container>
					<Container maxWidth="md">
						<div>
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
											<SelectWrapper
												name="classCode"
												label="Class"
												options={allClasses}
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="fathersName"
												label="Fathers Name"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="fathersPhone"
												label="Fathers Pnone Number"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextFieldWrapper
												name="fathersOccupation"
												label="Fathers Occupation"
												variant="outlined"
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="mothersName"
												label="Mothers Name"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="mothersOccupation"
												label="Mothers Occupation"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextFieldWrapper
												name="mothersPhone"
												label="Mothers Phone Number"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<div className={classes.submit}>
										<ButtonWrapper color="primary">Submit</ButtonWrapper>

										<ButtonWrapper
											closeModal={handleCancel}
											cancel
											color="secondary"
										>
											Cancel
										</ButtonWrapper>
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
