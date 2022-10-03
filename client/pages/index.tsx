import type { NextPage } from "next";
import Head from "next/head";
import { FlashNotification, Login } from "components";
import { useStateValue } from "state";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>SchoolX | Home</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<FlashNotification />
				<Login />
			</main>
		</div>
	);
};

export default Home;