import {  FormControlLabel, Checkbox, makeStyles,} from '@material-ui/core';
import { useField, useFormikContext } from "formik";

interface CheckBoxProps {
    name: string,
    label: string,
}

const useStyles = makeStyles(theme => {
    return {
        input: {
            backgroundColor: theme.palette.white[100]
        }
    }
})

export const CheckBoxWrapper = ({name, label}: CheckBoxProps) => {
    
    const [field, meta] = useField(name);
    const { values, setFieldValue } = useFormikContext();
    
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;
        setFieldValue(name, checked);
    }

    const configCheckBoxGroup: unknown = {
        ...field,
        value: values,
        name,
        label,
        onChange: handleChange
    }
    

    return (
        <FormControlLabel
            control={<Checkbox
                        {...configCheckBoxGroup} 
                        color="primary"
                        inputProps={{
                            className: classes.input
                        }}
                    />}
            label="Remember me"
        />
    )
};