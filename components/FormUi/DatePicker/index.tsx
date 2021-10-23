import { TextField } from '@material-ui/core';
import { useField } from "formik";

interface DatePickerProps {
    name: string,
    label: string
}

const DatePickerWrapper = ({name, label}: DatePickerProps) => {
    
    const [field, meta] = useField(name);

    const configDatePicker: any = {
        ...field,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        label,
        InputLabelProps: {
            shrink: true
        },
    }

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error;
    }

    return (
        <TextField {...configDatePicker}/>
    )
}

export default DatePickerWrapper;