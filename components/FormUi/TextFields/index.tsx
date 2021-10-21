import React from "react";
import { TextField } from '@material-ui/core';
import { useField } from "formik";

interface TextFieldProps {
    name: string,
    label: string
}

const TextFieldWrapper = ({name, label}: TextFieldProps) => {
    
    const [field, meta] = useField(name);

    const configTextField: any = {
        ...field,
        label,
    }

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField fullWidth variant="outlined" {...configTextField}/>
    )
}

export default TextFieldWrapper;