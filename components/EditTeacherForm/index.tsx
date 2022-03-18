import { useState, useEffect } from 'react';
import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { ClassType, Teacher, NewTeacher } from 'types';
import { makeStyles } from '@material-ui/styles';
import { 
    TextFieldWrapper,
    DatePickerWrapper,
    RadioWrapper,
    ButtonWrapper,
} from 'components/FormUi';
import { getAllClasses } from 'services';
import styles  from 'styles/editForm.module.scss';

interface EditFormProps {
    teacher: Teacher
    handleUpdateUser: (teacher: Teacher) => void
    handleUserDiscard: () => void
}


const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            marginTop: theme.spacing(8)
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


export const EditTeacherForm = ({teacher, handleUpdateUser, handleUserDiscard}: EditFormProps) => {
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

    const INITIAL_FORM_STATE: NewTeacher = {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        dateOfBirth: teacher.dateOfBirth,
        gender: teacher.gender,
        phone: teacher.phone,
        subject: ''
    };
    
    const FORM_VALIDATION = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        dateOfBirth: yup.date().required(),
        gender: yup.string().required("Please enter the gender"),

    });

    const handleSubmit = (values: NewTeacher) => {
        const teacherToUpdate = {
            ...values,
            id: teacher.id
        };
        handleUpdateUser(teacherToUpdate);
    };

    const handleDiscard = () => {
        handleUserDiscard();
    };
    
  return (
      <div className={styles.root}>
          <Grid container>
            <Container className={classes.title} maxWidth="md">
                <Typography variant="h5">
                    Edit Student
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
                                            name="first_name"
                                            label="First Name"
                                            variant="outlined"
                                            // value
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
                                            name="phone"
                                            label="Phone Number"
                                            variant="outlined"
                                        />
                                    </Grid>

                                </Grid>
                                <div className={classes.submit}>
                                    <ButtonWrapper color="primary">
                                        Update
                                    </ButtonWrapper>

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
            <Grid item xs={12}>
            </Grid>
        </Grid>
      </div>
  );
};
