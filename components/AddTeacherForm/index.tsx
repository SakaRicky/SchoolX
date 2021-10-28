import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { NewTeacher } from 'types';
import { makeStyles } from '@material-ui/styles';
import {
    TextFieldWrapper,
    DatePickerWrapper,
    RadioWrapper,
    ButtonWrapper
} from 'components/FormUi';


interface AddTeacherProps {
    handleSubmit: (values: NewTeacher) => void,
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

const INITIAL_FORM_STATE: NewTeacher = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone: ""
}

const FORM_VALIDATION = yup.object().shape({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    date_of_birth: yup.date().required(),
    gender: yup.string().required("Please enter the gender"),
    email: yup.string().email("Invalid email"),
    phone: yup.number().typeError("Please enter a valid phone number"),
});

export const AddTeacherForm = ({handleSubmit}: AddTeacherProps) => {
    const classes = useStyles();
  return (
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
};