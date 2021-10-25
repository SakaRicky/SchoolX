import { TextField } from '@material-ui/core';
import { useField } from "formik";

interface TextFieldProps {
    name: string,
    label: string,
    fullWidth?: boolean,
};

interface configTextField {
    label: string,
    fullWidth?: boolean,
    error?: boolean,
    helperText?: string
}

export const TextFieldWrapper = ({name, label, fullWidth}: TextFieldProps) => {
    
    const [field, meta] = useField(name);

    const configTextField: configTextField = {
        ...field,
        fullWidth,
        label
    }    

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }    

    return (
        <TextField {...configTextField}/>
    )
};