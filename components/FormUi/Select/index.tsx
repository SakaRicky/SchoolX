import * as React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik'

interface SelectProps {
    name: string,
    options: { [code: string] : string }
    label: string
};

export const SelectWrapper: React.FC<SelectProps> = ({name, options, label}: SelectProps) => {

    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFieldValue(name, value);
    }

    const configSelect: any = {
        ...field,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        label,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }
    
    return (
        <TextField {...configSelect}>
            {Object.keys(options).map((item, idx) => {                
                return (
                    <MenuItem key={idx} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}
        </TextField>
    );
};