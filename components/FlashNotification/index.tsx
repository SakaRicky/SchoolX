import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Notify, Color } from 'types';

interface FlashNotificationProps {
    notify: Notify
    setNotify : (n: Notify) => void
}

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}));

const FlashNotification = ({notify, setNotify}: FlashNotificationProps) => {
    
    const classes = useStyles();

    const handleClose = () => {
        setNotify(
            {
                ...notify,
                isOpen: false})
    }
    
    return (
            <Snackbar
                className={classes.root}
                open={notify.isOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleClose}
            >
                <Alert severity={notify.type} onClose={handleClose}>
                    <AlertTitle>Success</AlertTitle>
                    {notify.message}
                </Alert>
            </Snackbar>
    );
}

export default FlashNotification;