import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

interface ButtonProps {
    children: React.ReactChild | React.ReactChildren;
    color: string,
    cancel?: boolean,
    fullWidth?: boolean,
}

const ButtonWrapper = ({children, color, cancel, fullWidth}: ButtonProps) => {

    const { submitForm, resetForm } = useFormikContext();

    const handleSubmit = () => {        
        submitForm()
    }

    const handleCancel = () => {
        resetForm()
    }

    const configButton: any = {
        fullWidth,
        onClick: cancel ? handleCancel : handleSubmit,
        variant: 'contained',
        color: color
    }    

    return (
        <Button {...configButton}  >
            {children}
        </Button>
    );
}

export default ButtonWrapper;