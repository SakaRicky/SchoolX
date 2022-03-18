import { useState, useEffect, forwardRef } from 'react';
import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { NewStudent, ClassType } from 'types';
import { makeStyles } from '@material-ui/styles';
import { 
    TextFieldWrapper,
    SelectWrapper,
    DatePickerWrapper,
    RadioWrapper,
    ButtonWrapper,
} from 'components/FormUi';
import { getAllClasses } from 'services';


interface AddStudentProps {
    handleSubmit: (values: NewStudent) => void,
    handleCancel: () => void,
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

const INITIAL_FORM_STATE: NewStudent = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    fathersName: "",
    fathersPhone: "",
    fathersOccupation: "",
    mothersName: "",
    mothersPhone: "",
    mothersOccupation: "",
    classCode: ''
};

const FORM_VALIDATION = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required("Please enter the gender"),
    fathersPhone: yup.number().typeError("Please enter a valid phone number"),
    mothersPhone: yup.number().typeError("Please enter a valid phone number"),
});

// eslint-disable-next-line react/display-name
export const AddStudentForm = forwardRef<HTMLDivElement, AddStudentProps>(({handleSubmit, handleCancel}, ref) => {
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
    
  return (
      <div className={classes.root} ref={ref}>
          <Grid container>
            <Container className={classes.title} maxWidth="md">
                <Typography variant="h5">
                    Add New Student
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
                                        Submit
                                    </ButtonWrapper>

                                    <ButtonWrapper closeModal={handleCancel} cancel color="secondary">
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
