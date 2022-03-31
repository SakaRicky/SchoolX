import React, { useState, useEffect, createRef } from 'react';
import { NewTeacher, Notify, Teacher } from 'types';
import { getUsers, saveUser } from 'services';
import { Grid, makeStyles, Modal } from '@material-ui/core';
import styles from 'styles/teachers.module.scss';
import { SearchField, FlashNotification, AddTeacherForm } from 'components';
import { Button, TeacherCard } from 'components';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles(theme => {
    return {
        root: {
            color: '#fff',
            height: "550px",
            width: "100%",
            paddingTop: theme.spacing(5)
        },
        modal: {

        },
        link: {
            color: '#054ff0',
        },
        header: {
            textAlign: "center"
        },
        table: {
          margin: theme.spacing(5)
        }
    };
});


const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>();
  const [searchText, setSearchText] = useState<string>("");

  const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});
  // open and close modal with this state, and also to 
  const [openAddTeacherModal, setOpenAddTeacherModal] = useState<boolean>(false);

  const classes = useStyles();

  const fetchTeachers = async () => {      
    try {
      const receivedTeachers = await getUsers();
      setTeachers(receivedTeachers);
    } catch (error: any) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchTeachers();
  }, []); 

  // filter according to search state or return the whole data
  const filteredTeachers = searchText ? teachers?.filter(data => {
      return data.firstName.toLowerCase().includes(searchText);
  }) : teachers;


  const handleSearchCancel = () => {
      setSearchText("");
  };

  const handleCloseModal = () => {
    setOpenAddTeacherModal(false);
  };

  // Wil later check why I mapped this
  // const teachers_to_dispaly: Teacher = filteredTeachers?.map((teacher, index) => {        
  //     // <Link href={`teachers/${content.id}`} passHref={true}></Link>
  //     return teacher
  // });

  const handleSubmit = async (newTeacher: NewTeacher) => {
    try {
        const res = await saveUser(newTeacher);
        setNotify({
            isOpen: true,
            message: "Teacher saved successfully",
            type: "success"
        });
        handleCloseModal();
        fetchTeachers();
      } catch (error: any) {
          setNotify({
              isOpen: true,
              message: error,
              type: "error"
          });
      }               
  };

  const handleAddTeacher = () => {
    setOpenAddTeacherModal(true);
  };

  const formRef = createRef<HTMLDivElement>();
  

return (
  <div className={styles.root}>
    <FlashNotification notify={notify} setNotify={setNotify} />

    <Modal
        open={openAddTeacherModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
      <AddTeacherForm handleSubmit={handleSubmit} ref={formRef} />
    </Modal>
    <div className={styles.head}>
      <h2>List of Teacher</h2>
      <Button handleClick={handleAddTeacher} label="Add Teacher"><PersonAddIcon /></Button>
    </div>

    <div className={styles.content}>
      <SearchField
        handleSearchCancel={handleSearchCancel}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </div>
    <Grid container spacing={2}>
      {filteredTeachers?.map((teacher, index) => {
        return <Grid xs={12} sm={6} md={4} key={index} item><TeacherCard teacher={teacher}/></Grid>;
      })}
    </Grid>
    {/* {teachers && <Table tableData={teachers}/>} */}
  </div>
);

};

export default Teachers;