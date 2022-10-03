import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Modal } from "@material-ui/core";
import { User } from "types";
import { getUser, updateUser } from "services";
import styles from "./userPage.module.scss";
import Image from "next/image";
import EditIcon from "@material-ui/icons/Edit";
import { EditUserForm, Loader } from "components";
import { ReceivedUser } from "services/user";

const UserPage = () => {
	const [user, setUser] = useState<User>();
	const [displayedUser, setDisplayedUser] = useState<ReceivedUser>();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [editUser, setEditUser] = useState<User>();

	const router = useRouter();
	const { userID } = router.query;

	const fetchUser = async () => {
		if (typeof userID === "string") {
			try {
				const receivedUser = await getUser(userID);
				console.log("receivedUsers in [userID] useEffect: ", receivedUser);

				const user: User = {
					...receivedUser,
					roles: receivedUser.roles.map(r => parseInt(r.id)),
					subjectIds: receivedUser.subjects.map(s => parseInt(s.id)),
				};
				setUser(user);
				setDisplayedUser(receivedUser);
			} catch (error: any) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchUser();
	}, [userID]);

	const handleEdit = () => {
		setOpenModal(true);
		setEditUser(user);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleUpdateUser = async (user: User) => {
		try {
			const updatedUser: User = await updateUser(user);
			setUser(updatedUser);
		} catch (error) {
			console.log(error);
		}
		setOpenModal(false);
	};

	const handleUserDiscard = () => {
		setOpenModal(false);
	};

	const roles =
		displayedUser !== undefined
			? displayedUser.roles.map(role => {
					return (
						<span key={role.code} className={styles.role}>
							{role.name}
						</span>
					);
			  })
			: null;

	const subjects =
		displayedUser !== undefined
			? displayedUser.subjects.map(subject => {
					return (
						<span key={subject.code} className={styles.subject}>
							{subject.name}
						</span>
					);
			  })
			: null;

	return (
		<>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				className={styles.modal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{/** I use a paragraph here because of error indicating modal can only take ReactNode or JSX */}
				{editUser ? (
					<EditUserForm
						handleUpdateUser={handleUpdateUser}
						handleUserDiscard={handleUserDiscard}
						user={editUser}
					/>
				) : (
					<p>No one selected to edit</p>
				)}
			</Modal>
			<div className={styles.root}>
				{/* <Typography>Student View Info Page</Typography> */}
				{displayedUser !== undefined ? (
					<>
						<div className={styles.profile}>
							<div className={styles.profile__img}>
								<Image
									src={
										user?.gender === "Male"
											? "/images/black-man.png"
											: "/images/woman.png"
									}
									alt={displayedUser.firstName}
									// layout="fill"
									width={150}
									height={150}
								/>
							</div>
							<div className={styles.profile__text}>
								<strong>
									{displayedUser.firstName + " " + displayedUser.lastName}
								</strong>
							</div>
						</div>
						<div className={styles.detailWrapper}>
							<div className={styles.title}>
								<Typography variant="h4">User Detail</Typography>
								<div className={styles.editIcon} onClick={handleEdit}>
									<EditIcon />
								</div>{" "}
								{/* onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleOpenModal(content)} */}
							</div>
							<div className={styles.details}>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>First Name</span>
										{displayedUser.firstName}
									</Typography>
								</div>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>Last Name</span>
										{displayedUser.lastName}
									</Typography>
								</div>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>Date of Birth</span>
										{displayedUser.dateOfBirth}
									</Typography>
								</div>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>Gender</span>
										{displayedUser.gender}
									</Typography>
								</div>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>Roles</span>
										<div
											style={{ borderBottom: "none" }}
											className={styles.roles}
										>
											{roles}
										</div>
									</Typography>
								</div>
								<div>
									<Typography className={styles.detail} variant="h6">
										<span className={styles.label}>Subject</span>
										<div
											style={{ borderBottom: "none" }}
											className={styles.roles}
										>
											{subjects}
										</div>
									</Typography>
								</div>
							</div>
						</div>
					</>
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default UserPage;
