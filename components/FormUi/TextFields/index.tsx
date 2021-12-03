import { TextField, makeStyles } from '@material-ui/core';
import { useField } from "formik";
import { theme } from 'theme';

interface TextFieldProps {
    name: string,
    label: string,
    fullWidth?: boolean,
    variant?: 'filled'| 'outlined' | 'standard'
};

interface configTextField {
    label: string,
    fullWidth?: boolean,
    error?: boolean,
    helperText?: string
    variant: 'filled'| 'outlined' | 'standard'
}

const useStyles = makeStyles(theme => {
    return {
        input: {
            backgroundColor: theme.palette.white[100]
        }
    }
})

export const TextFieldWrapper = ({name, label, fullWidth, variant}: TextFieldProps) => {
    
    const [field, meta] = useField(name);

    const classes = useStyles();

    const configTextField: configTextField = {
        ...field,
        fullWidth: !!fullWidth ? fullWidth : true,
        label,
        variant: !!variant ? variant : 'standard'
    }    

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }    

    return (
        <TextField
            InputProps={{
                className: classes.input
            }}
            {...configTextField}
        />
    )
};