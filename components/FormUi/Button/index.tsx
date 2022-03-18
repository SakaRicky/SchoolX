import { Button, makeStyles } from "@material-ui/core";
import { useFormikContext } from "formik";
interface ButtonProps {
    children: React.ReactNode;
    color: string,
    cancel?: boolean,
    fullWidth?: boolean,
    closeModal?: () => void
}

const useStyles = makeStyles(() => {
    return {
        button: {
            transition: "transform 200ms ease-in-out",

            '&:hover': {
                transform: "scale(1.1)"
            }
        }
    };
});

export const ButtonWrapper = ({children, color, cancel, fullWidth, closeModal}: ButtonProps) => {

    const { submitForm, resetForm } = useFormikContext();

    const classes = useStyles();

    const handleSubmit = () => {        
        submitForm();
    };

    const handleCancel = () => {
        resetForm();
        closeModal && closeModal();
    };

    const configButton: any = {
        fullWidth,
        onClick: cancel ? handleCancel : handleSubmit,
        variant: 'contained',
        color: color
    };    

    return (
        <Button
            {...configButton}
            className={classes.button}
        >
            {children}
        </Button>
    );
};