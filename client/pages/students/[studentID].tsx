import { useState, useEffect } from "react";
import { Typography, Modal, DialogContent } from "@material-ui/core";
import Image from "next/image";
import styles from "./studentPage.module.scss";
import { Student } from "types";
import { getStudent, updateStudent } from "services";
import { useRouter } from "next/router";
import EditIcon from "@material-ui/icons/Edit";
import { EditStudentForm } from "components";
import { ReturnedStudent } from "services/student";
import { setNotification, useStateValue } from "state";

const StudentPage = () => {
	const [globalState, dispatch] = useStateValue();
	const [student, setStudent] = useState<ReturnedStudent>();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [editStudent, setEditStudent] = useState<Student>();

	const router = useRouter();

	const { studentID } = router.query;

	useEffect(() => {
		const fetchStudent = async () => {
			// to make sure the studentID is not undefined before
			// we fetch for that student. This occurs because router.query
			// first returns undefine when you refresh
			if (typeof studentID === "string") {
				try {
					const receivedStudent: ReturnedStudent = await getStudent(studentID);
					setStudent(receivedStudent);
				} catch (error: any) {
					console.log(error);
				}
			}
		};
		fetchStudent();
	}, [studentID]);

	const handleEdit = () => {
		setOpenModal(true);
		setEditStudent(student);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleUpdateStudent = async (student: Student) => {
		console.log("student to update: ", student);

		try {
			const updatedStudent: ReturnedStudent = await updateStudent(student);
			setStudent(updatedStudent);
			dispatch(
				setNotification({
					isOpen: true,
					message: "Student updated successfully",
					type: "success",
				})
			);
			handleCloseModal();
		} catch (error: any) {
			console.log(error.message);
			dispatch(
				setNotification({
					isOpen: true,
					message: error.message,
					type: "error",
				})
			);
		}
	};

	const handleStudentDiscard = () => {
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				className={styles.modal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{/* This fragment is to prevent react error on forwardRef(Modal) */}
				<>
					{/** I use a paragraph here because of error indicating modal can only take ReactNode or JSX */}
					{editStudent ? (
						<EditStudentForm
							handleUpdateStudent={handleUpdateStudent}
							handleStudentDiscard={handleStudentDiscard}
							student={editStudent}
						/>
					) : (
						<p>No one selected to edit</p>
					)}
				</>
			</Modal>
			<div className={styles.root}>
				{/* <Typography>Student View Info Page</Typography> */}
				<div className={styles.profile}>
					<div className={styles.profile__img}>
						<Image src="/images/boy.png" alt="Student Image" layout="fill" />
					</div>
					<div className={styles.profile__text}>
						<strong>{student?.firstName + " " + student?.lastName}</strong>
					</div>
				</div>
				<div className={styles.detailWrapper}>
					<div className={styles.title}>
						<Typography variant="h4">Student Detail</Typography>
						<div className={styles.editIcon} onClick={handleEdit}>
							<EditIcon />
						</div>{" "}
						{/* onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleOpenModal(content)} */}
					</div>
					<div className={styles.details}>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>First Name</span>
								{student?.firstName}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Last Name</span>
								{student?.lastName}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Date of Birth</span>
								{student?.dateOfBirth}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Class</span>
								{student?.student_class.className}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Father Name</span>
								{student?.fathersName}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Father Occupation</span>
								{student?.fathersOccupation}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Father Phone Number</span>
								{student?.fathersPhone}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Mother Name</span>
								{student?.mothersName}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Mother Occupation</span>
								{student?.mothersOccupation}
							</Typography>
						</div>
						<div>
							<Typography className={styles.detail} variant="h6">
								<span className={styles.label}>Mother Phone Number</span>
								{student?.mothersPhone}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentPage;
