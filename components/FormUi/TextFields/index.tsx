import { TextField } from '@material-ui/core';
import { useField } from "formik";

interface TextFieldProps {
    name: string,
    label: string,
    fullWidth?: boolean,
}

const TextFieldWrapper = ({name, label, fullWidth}: TextFieldProps) => {
    
    const [field, meta] = useField(name);

    const configTextField: any = {
        ...field,
        fullWidth,
        label,
    }    

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }    

    return (
        <TextField {...configTextField}/>
    )
}

export default TextFieldWrapper;