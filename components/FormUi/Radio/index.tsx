import * as React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useField, useFormikContext } from "formik";

interface RadioProps {
    name: string,
}

const RadioWrapper = ({name}: RadioProps) => {
    
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFieldValue(name, value);
    }

    const configRadioGroup: any = {
        ...field,
        name,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configRadioGroup.error = true;
        configRadioGroup.helperText = meta.error;
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" {...configRadioGroup} >
                <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
            </RadioGroup>
        </FormControl>
    )
}

export default RadioWrapper;