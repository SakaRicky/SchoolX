import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useStateValue, setUser } from "state";

const Dashboard = () => {
    const [, dispatch] = useStateValue();    
    
    useEffect(() => {
        dispatch(setUser({
            email: 'sakaricky91@gmail.com',
            name: "Saka Ricky"
        }));
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h6">
                Dashboard
            </Typography>
        </div>
    );
};

export default Dashboard;