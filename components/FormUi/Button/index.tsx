import * as React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

interface ButtonProps {
    children: React.ReactChild | React.ReactChildren;
    color: string,
    cancel?: boolean
}

const ButtonWrapper = ({children, color, cancel}: ButtonProps) => {

    const { submitForm, resetForm } = useFormikContext();

    const handleSubmit = () => {
        submitForm()
    }

    const handleCancel = () => {
        resetForm()
    }

    const configButton: any = {
        onClick: cancel ? handleCancel : handleSubmit,
        variant: 'contained',
        color: color,
        xs: 12,
        md: 6
    }

    return (
        <Button {...configButton}  >
            {children}
        </Button>
    );
}

export default ButtonWrapper;