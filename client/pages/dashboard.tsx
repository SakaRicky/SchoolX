import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useStateValue, setUser } from "state";

const Dashboard = () => {
	const [globalState, dispatch] = useStateValue();

	// useEffect(() => {

	// }, [dispatch]);

	return (
		<div>
			<Typography variant="h6">Dashboard</Typography>
		</div>
	);
};

export default Dashboard;
