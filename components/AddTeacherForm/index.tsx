import { useState, useEffect } from 'react';
import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { NewTeacher, Subject } from 'types';
import { makeStyles } from '@material-ui/styles';
import {
    TextFieldWrapper,
    DatePickerWrapper,
    RadioWrapper,
    ButtonWrapper,
    SelectWrapper
} from 'components/FormUi';
import { getAllSubjects } from 'services';
import { forwardRef } from 'react';


interface AddTeacherProps {
    handleSubmit: (values: NewTeacher) => void,
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            maxWidth: "900px",
            margin: '0 auto',
            marginTop: theme.spacing(20),
            backgroundColor: theme.palette.myGrey[100]
        },
        formWrapper: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(8)
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
            marginBottom: theme.spacing(5)
        }
    };
});

const INITIAL_FORM_STATE: NewTeacher = {
    firstName: "",
    lastName: "",
    subject: "",
    dateOfBirth: new Date(),
    gender: "",
    email: "",
    phone: ""
};

const FORM_VALIDATION = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required("Please enter the gender"),
    email: yup.string().email("Invalid email"),
    phone: yup.number().typeError("Please enter a valid phone number"),
    subject: yup.string().typeError("Please select a subject"),
});

// eslint-disable-next-line react/display-name
export const AddTeacherForm = forwardRef<HTMLDivElement, AddTeacherProps>(({handleSubmit}, ref) => {
    
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

  return (
      <div ref={ref}>
          <Grid container className={classes.root}>
            <Container className={classes.title} maxWidth="md">
                <Typography variant="h5">
                    Add New Teacher
                </Typography>
            </Container>
                <Container maxWidth="md">
                    <div>
                        <Formik
                            initialValues= {{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit= {values => {                            
                                handleSubmit(values);
                            }}
                        >
                            <Form>

                                <Grid container spacing={2}>

                                    <Grid item xs={6}>
                                        <TextFieldWrapper 
                                            name="firstName"
                                            label="FirN Name"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextFieldWrapper 
                                            name="last_name"
                                            label="Last Name"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <DatePickerWrapper 
                                            name="date_of_birth"
                                            label="Date of Birth"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <RadioWrapper
                                            name="gender"
                                        />
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

                                    <Grid item xs={12}>
                                        <SelectWrapper
                                            name="subject"
                                            label="Subject To Teach"
                                            options={allSubjects}
                                        />
                                    </Grid>
                                </Grid>
                                <div className={classes.submit}>
                                    <ButtonWrapper color="primary">
                                        Submit
                                    </ButtonWrapper>

                                    <ButtonWrapper cancel color="secondary">
                                        Cancel
                                    </ButtonWrapper>
                                </div>

                            </Form>
                        </Formik>
                    </div>

                </Container>
            <Grid item xs={12}>

            </Grid>
        </Grid>
      </div>
  );
});