import { Button, makeStyles } from "@material-ui/core";
import { useFormikContext } from "formik";

interface ButtonProps {
    children: React.ReactNode;
    color: string,
    cancel?: boolean,
    fullWidth?: boolean,
    closeModal?: () => void
}

const useStyles = makeStyles(theme => {
    return {
        input: {
            color: theme.palette.white[100]
        }
    }
})

export const ButtonWrapper = ({children, color, cancel, fullWidth, closeModal}: ButtonProps) => {

    const { submitForm, resetForm } = useFormikContext();

    const classes = useStyles();

    const handleSubmit = () => {        
        submitForm()
    }

    const handleCancel = () => {
        resetForm()
        closeModal && closeModal()
    }

    const configButton: any = {
        fullWidth,
        onClick: cancel ? handleCancel : handleSubmit,
        variant: 'contained',
        color: color
    }    

    return (
        <Button
            {...configButton}
            
        >
            {children}
        </Button>
    );
};