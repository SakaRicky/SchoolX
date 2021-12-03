import { useState, useEffect } from 'react'
import { Typography, Modal } from '@material-ui/core';
import Image from 'next/image'
import styles from 'styles/studentPage.module.scss';
import { Student } from 'types';
import { getStudent, updateStudent } from 'services';
import { useRouter } from 'next/router'
import EditIcon from '@material-ui/icons/Edit';
import { EditStudentForm } from 'components';



const StudentPage = () => {
    const [student, setStudent] = useState<Student>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editStudent, setEditStudent] = useState<Student>();

    const router = useRouter()

    const { studentID } = router.query;    
    
    useEffect(() => {
        const fetchStudent = async () => {
            // to make sure the studentID is not undefined before
            // we fetch for that student. This occurs because router.query
            // first returns undefine when you refresh
            if (typeof studentID === 'string') {
                try {
                    const receivedStudent: Student = await getStudent(studentID);
                    setStudent(receivedStudent)
                    
                } catch (error: any) {
                    console.log(error);
                }
            }  
        }
        fetchStudent()
    }, [])

    const handleEdit = () => {
        setOpenModal(true);
        setEditStudent(student);
        console.log(student);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleUpdateStudent = async (student: Student) => {
        try {
          const updatedTeacher: Student = await updateStudent(student);
          setStudent(updatedTeacher);
        } catch (error) {
          console.log(error);
        }
        setOpenModal(false);
      };
    
      const handleStudentDiscard = () => {
        setOpenModal(false)
      }

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
                {editStudent ? <EditStudentForm handleUpdateStudent={handleUpdateStudent} handleStudentDiscard={handleStudentDiscard} student={editStudent} /> : <p>No one selected to edit</p>}
                
            </Modal>
            <div className={styles.root}>
                {/* <Typography>Student View Info Page</Typography> */}
                <div className={styles.profile}>
                    <div className={styles.profile__img}>
                        <Image
                            src="/images/boy.png"
                            alt="Student Image"
                            layout='fill'
                        />
                    </div>
                    <div className={styles.profile__text}>
                        <strong>{student?.first_name + " " + student?.last_name}</strong>
                    </div>
                </div>
                <div className={styles.detailWrapper}>
                    <div className={styles.title}>
                        <Typography variant="h4">Student Detail</Typography>
                        <div className={styles.editIcon} onClick={handleEdit}><EditIcon/></div> {/* onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleOpenModal(content)} */}
                    </div>
                    <div className={styles.details}>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>First Name</span>
                                {student?.first_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Last Name</span>
                                {student?.last_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Date of Birth</span>
                                {student?.date_of_birth}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Class</span>
                                {student?.class_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Father Name</span>
                                {student?.fathers_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Father Occupation</span>
                                {student?.fathers_occupation}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                            <span className={styles.label}>Father Phone Number</span>
                            {student?.fathers_phone}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Mother Name</span>
                                {student?.mothers_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Mother Occupation</span>
                                {student?.mothers_occupation}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Mother Phone Number</span>
                                {student?.mothers_phone}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentPage
