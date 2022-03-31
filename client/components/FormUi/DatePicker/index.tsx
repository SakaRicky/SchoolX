import { makeStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useField, useFormikContext } from "formik";

interface DatePickerProps {
    name: string,
    label: string
}

const useStyles = makeStyles(theme => {
    return {
        input: {
            backgroundColor: theme.palette.white[100]
        }
    };
});

export const DatePickerWrapper = ({name, label}: DatePickerProps) => {
    
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const classes = useStyles();    

    const configDatePicker: any = {
        ...field,
        fullWidth: true,
        label,
        InputLabelProps: {
            shrink: true
        },
    };

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error;
    }

    return (

        <KeyboardDatePicker
            {...configDatePicker}
            format= "dd/MM/yyyy"
            value={field.value}
            variant= 'inline'
            inputVariant="outlined"
            data-testid={name}
            InputProps={{
                className: classes.input
            }}
            onChange = {(date: Date) => setFieldValue(name, date)}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    );
};