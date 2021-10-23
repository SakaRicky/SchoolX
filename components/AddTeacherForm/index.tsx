import * as React from 'react';
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
import TextField from 'components/FormUi/TextFields';
import DatePicker from 'components/FormUi/DatePicker';
import Radio from 'components/FormUi/Radio';
import Button from 'components/FormUi/Button';


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

const AddTeacherForm: React.FC<AddTeacherProps> = ({handleSubmit}: AddTeacherProps) => {
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
                                    <TextField 
                                        name="first_name"
                                        label="First Name"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField 
                                        name="last_name"
                                        label="Last Name"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <DatePicker 
                                        name="date_of_birth"
                                        label="Date of Birth"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Radio
                                        name="gender"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="email"
                                        label="Email Address"
                                    />
                                </Grid>

                                
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="phone"
                                        label="Phone Number"
                                    />
                                </Grid>
                            </Grid>
                            <div className={classes.submit}>
                                <Button color="primary">
                                    Submit
                                </Button>

                                <Button cancel color="secondary">
                                    Cancel
                                </Button>
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

export default AddTeacherForm;