import {  FormControlLabel, Checkbox,} from '@material-ui/core';
import { useField, useFormikContext } from "formik";

interface CheckBoxProps {
    name: string,
    label: string,
}

export const CheckBoxWrapper = ({name, label}: CheckBoxProps) => {
    
    const [field, meta] = useField(name);
    const { values, setFieldValue } = useFormikContext();
    

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
            control={<Checkbox {...configCheckBoxGroup}  color="primary" />}
            label="Remember me"
        />
    )
};