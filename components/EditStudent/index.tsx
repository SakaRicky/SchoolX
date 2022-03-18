import { useState, useEffect } from 'react';
import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { ClassType, Student } from 'types';
import { makeStyles } from '@material-ui/styles';
import { 
    TextFieldWrapper,
    SelectWrapper,
    DatePickerWrapper,
    RadioWrapper,
    ButtonWrapper,
} from 'components/FormUi';
import { getAllClasses } from 'services';
import styles  from 'styles/editForm.module.scss';


interface EditFormProps {
    student: Student
    handleUpdateStudent: (student: Student) => void
    handleStudentDiscard: () => void
}


const useStyles = makeStyles((theme: Theme) => {
    return {
        
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


export const EditStudentForm = ({student, handleUpdateStudent, handleStudentDiscard}: EditFormProps) => {
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

    type EditStudent = Omit<Student, 'id'>;

    const INITIAL_FORM_STATE: EditStudent = {
        firstName: student.firstName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        className: student.className,
        classCode: student.classCode,
        fathersName: student.fathersName,
        fathersPhone: student.fathersPhone,
        fathersOccupation: student.fathersOccupation,
        mothersName: student.mothersName,
        mothersPhone: student.mothersPhone,
        mothersOccupation: student.mothersOccupation
    };
    
    const FORM_VALIDATION = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        dateOfBirth: yup.date().required(),
        gender: yup.string().required("Please enter the gender"),
        fathersPhone: yup.number().typeError("Please enter a valid phone number"),
        mothersPhone: yup.number().typeError("Please enter a valid phone number"),
    });

    const handleSubmit = (values: EditStudent) => {
        const studentToUpdate = {
            ...values,
            id: student.id
        };        
        handleUpdateStudent(studentToUpdate);
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

                                    <Grid item xs={12}>
                                        <SelectWrapper
                                            name="class"
                                            label="Class"
                                            options={allClasses}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextFieldWrapper 
                                            name="fathers_name"
                                            label="Fathers Name"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextFieldWrapper 
                                            name="fathers_phone"
                                            label="Fathers Pnone Number"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextFieldWrapper 
                                            name="fathers_occupation"
                                            label="Fathers Occupation"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextFieldWrapper 
                                            name="mothers_name"
                                            label="Mothers Name"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextFieldWrapper 
                                            name="mothers_occupation"
                                            label="Mothers Occupation"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextFieldWrapper 
                                            name="mothers_phone"
                                            label="Mothers Phone Number"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <div className={classes.submit}>
                                    <ButtonWrapper color="primary">
                                        Update
                                    </ButtonWrapper>

                                    <div onClick={handleStudentDiscard}>
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
