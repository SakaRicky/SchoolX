import { useState, useEffect, FC } from 'react';
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
import classListServices from 'services/classList';


interface AddStudentProps {
    handleSubmit: (values: NewStudent) => void,
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
    }
});

const INITIAL_FORM_STATE: NewStudent = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    class: "",
    fathers_name: "",
    fathers_phone: "",
    fathers_occupation: "",
    mothers_name: "",
    mothers_phone: "",
    mothers_occupation: ""
}

const FORM_VALIDATION = yup.object().shape({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    date_of_birth: yup.date().required(),
    gender: yup.string().required("Please enter the gender"),
    fathers_phone: yup.number().typeError("Please enter a valid phone number"),
    mothers_phone: yup.number().typeError("Please enter a valid phone number"),
});

const AddStudentForm: FC<AddStudentProps> = ({handleSubmit}: AddStudentProps) => {
    const [allClasses, setAllClasses] = useState<ClassType[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const allClasses: ClassType[] = await classListServices.getAllClasses();
                setAllClasses(allClasses);
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchClasses();
    }, [])
    
  return (
      <Grid container className={classes.root}>
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
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextFieldWrapper 
                                        name="last_name"
                                        label="Last Name"
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
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldWrapper 
                                        name="fathers_phone"
                                        label="Fathers Pnone Number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldWrapper 
                                        name="fathers_occupation"
                                        label="Fathers Occupation"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextFieldWrapper 
                                        name="mothers_name"
                                        label="Mothers Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldWrapper 
                                        name="mothers_occupation"
                                        label="Mothers Occupation"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldWrapper 
                                        name="mothers_phone"
                                        label="Mothers Phone Number"
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
  );
}
