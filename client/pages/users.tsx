import React, { useState, useEffect, createRef } from "react";
import { User, NewUser } from "types";
import { getUsers, saveUser } from "services";
import { Grid, makeStyles, Modal } from "@material-ui/core";
import styles from "styles/users.module.scss";
import { SearchField, AddTeacherForm } from "components";
import { Button, UserCard } from "components";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { setNotification, useStateValue } from "state";

const useStyles = makeStyles(theme => {
	return {
		root: {
			color: "#fff",
			height: "550px",
			width: "100%",
			paddingTop: theme.spacing(5),
		},
		modal: {},
		link: {
			color: "#054ff0",
		},
		header: {
			textAlign: "center",
		},
		table: {
			margin: theme.spacing(5),
		},
	};
});

const Teachers = () => {
	const [users, setUsers] = useState<User[]>();
	const [searchText, setSearchText] = useState<string>("");
	const [globalState, dispatch] = useStateValue();

	// open and close modal with this state, and also to
	const [openAddTeacherModal, setOpenAddTeacherModal] =
		useState<boolean>(false);

	const classes = useStyles();

	const fetchUsers = async () => {
		try {
			const receivedUsers = await getUsers();
			setUsers(receivedUsers);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// filter according to search state or return the whole data
	const filteredUsers = searchText
		? users?.filter(data => {
				return data.firstName.toLowerCase().includes(searchText);
		  })
		: users;

	const handleSearchCancel = () => {
		setSearchText("");
	};

	const handleCloseModal = () => {
		setOpenAddTeacherModal(false);
	};

	// Wil later check why I mapped this
	// const teachers_to_dispaly: Teacher = filteredUsers?.map((teacher, index) => {
	//     // <Link href={`teachers/${content.id}`} passHref={true}></Link>
	//     return teacher
	// });

	const handleSubmit = async (newUser: NewUser) => {
		try {
			const res = await saveUser(newUser);
			dispatch(
				setNotification({
					isOpen: true,
					message: "Teacher saved successfully",
					type: "success",
				})
			);
			handleCloseModal();
			fetchUsers();
		} catch (error: any) {
			dispatch(
				setNotification({
					isOpen: true,
					message: error,
					type: "error",
				})
			);
			handleCloseModal();
		}
	};

	const handleAddTeacher = () => {
		setOpenAddTeacherModal(true);
	};

	const formRef = createRef<HTMLDivElement>();

	return (
		<div className={styles.root}>
			<Modal
				open={openAddTeacherModal}
				onClose={handleCloseModal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<AddTeacherForm
					handleSubmit={handleSubmit}
					handleCloseModal={handleCloseModal}
					ref={formRef}
				/>
			</Modal>
			<div className={styles.head}>
				<h2>List of Teacher</h2>
				<Button handleClick={handleAddTeacher} label="Add Teacher">
					<PersonAddIcon />
				</Button>
			</div>

			<div className={styles.content}>
				<SearchField
					handleSearchCancel={handleSearchCancel}
					searchText={searchText}
					setSearchText={setSearchText}
				/>
			</div>
			<Grid container spacing={2}>
				{filteredUsers?.map((user, index) => {
					return (
						<Grid xs={12} sm={6} md={4} key={index} item>
							<UserCard user={user} />
						</Grid>
					);
				})}
			</Grid>
			{/* {teachers && <Table tableData={teachers}/>} */}
		</div>
	);
};

export default Teachers;
