import { TextField } from '@material-ui/core';
import { useField } from "formik";

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

export const TextFieldWrapper = ({name, label, fullWidth, variant}: TextFieldProps) => {
    
    const [field, meta] = useField(name);

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
        <TextField {...configTextField}/>
    )
};