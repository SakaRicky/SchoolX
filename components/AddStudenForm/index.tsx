import React from 'react';
import { Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { NewStudent } from 'types';
import { makeStyles } from '@material-ui/styles';
import TextField from 'components/FormUi/TextFields';
import Select from 'components/FormUi/Select';
import DatePicker from 'components/FormUi/DatePicker';
import Radio from 'components/FormUi/Radio';
import Button from 'components/FormUi/Button';
import schoolClasses from 'data/classes.json';


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

const AddStudentForm: React.FC<AddStudentProps> = ({handleSubmit}: AddStudentProps) => {
    const classes = useStyles();

    const handleCancel = () => {

    }
    
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

                                <Grid item xs={12}>
                                    <Select
                                        name="class"
                                        label="Class"
                                        options={schoolClasses}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="fathers_name"
                                        label="Fathers Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="fathers_phone"
                                        label="Fathers Pnone Number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        name="fathers_occupation"
                                        label="Fathers Occupation"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="mothers_name"
                                        label="Mothers Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="mothers_occupation"
                                        label="Mothers Occupation"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        name="mothers_phone"
                                        label="Mothers Phone Number"
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

export default AddStudentForm;