import { ChangeEvent } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { ClassType } from 'types';

interface SelectProps {
    name: string,
    options: ClassType[]
    label: string,
    handleChangeParent?: (event: ChangeEvent<HTMLInputElement>) => void
}
export const SelectWrapper = ({name, options, label, handleChangeParent}: SelectProps) => {

    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFieldValue(name, value);
    }

    const configSelect: any = {
        ...field,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        label,
        onChange: handleChangeParent ? handleChangeParent : handleChange
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }
    
    return (
        <TextField {...configSelect}>
            {options.map((singleClass, idx) => {                
                return (
                    <MenuItem key={idx} value={singleClass.code}>
                        {singleClass.name}
                    </MenuItem>
                )
            })}
        </TextField>
    );
};