import * as React from "react";
import {  FormControlLabel, Checkbox,} from '@material-ui/core';
import { useField, useFormikContext } from "formik";

interface CheckBoxProps {
    name: string,
    label: string,
}

const CheckBoxWrapper = ({name, label}: CheckBoxProps) => {
    
    const [field, meta] = useField(name);
    const { values, setFieldValue } = useFormikContext();
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;
        setFieldValue(name, checked);
    }

    const configCheckBoxGroup: any = {
        ...field,
        value: values,
        name,
        label,
        onChange: handleChange
    }
    

    return (
        <FormControlLabel
            control={<Checkbox {...configCheckBoxGroup}  color="primary" />}
            label="Remember me"
        />
    )
}

export default CheckBoxWrapper;