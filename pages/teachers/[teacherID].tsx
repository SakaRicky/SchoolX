import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Modal } from '@material-ui/core';
import { Teacher } from 'types';
import { getUser, updateUser } from 'services';
import styles from 'styles/studentPage.module.scss'
import Image from 'next/image'
import EditIcon from '@material-ui/icons/Edit';
import { EditTeacherForm } from 'components';


const TeacherPage = () => {
  const [teacher, setTeacher] = useState<Teacher>();
  const [openModal, setOpenModal] = useState<boolean>(false);
    const [editTeacher, setEditTeacher] = useState<Teacher>();

  const router = useRouter()
  const { teacherID } = router.query
  
  useEffect(() => {
    const fetchTeacher = async () => {      
      if (typeof teacherID === "string") {
        try {
          const receivedTeacher: Teacher = await getUser(teacherID);
          setTeacher(receivedTeacher);
        } catch (error: any) {
          console.log(error);
        }
      }
    }
    fetchTeacher();
  }, [])  

  const handleEdit = () => {
      setOpenModal(true);
      setEditTeacher(teacher);
      console.log(teacher);
  }

  const handleCloseModal = () => {
      setOpenModal(false);
  };

  const handleUpdateUser = async (teacher: Teacher) => {
    try {
      const updatedTeacher: Teacher = await updateUser(teacher);
      setTeacher(updatedTeacher);
    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
  };

  const handleUserDiscard = () => {
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
                {editTeacher ? <EditTeacherForm handleUpdateUser={handleUpdateUser} handleUserDiscard={handleUserDiscard} teacher={editTeacher} /> : <p>No one selected to edit</p>}
                
            </Modal>
            <div className={styles.root}>
                {/* <Typography>Student View Info Page</Typography> */}
                <div className={styles.photo}>
                    <div className={styles.avatar}>
                        <Image
                            src={teacher?.gender === 'male' ? "/images/black-man.png" : "/images/woman.png"}
                            alt="Student Image"
                            layout='fill'
                        />
                    </div>
                    <div className={styles.photoName}>
                        <strong>{teacher?.first_name + " " + teacher?.last_name}</strong>
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
                                {teacher?.first_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Last Name</span>
                                {teacher?.last_name}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Date of Birth</span>
                                {teacher?.date_of_birth}
                            </Typography>
                        </div>
                        <div>
                            <Typography className={styles.detail} variant="h6">
                                <span className={styles.label}>Gender</span>
                                {teacher?.gender}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default TeacherPage;