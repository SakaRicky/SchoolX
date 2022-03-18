import React, { useState, useEffect, ChangeEvent, useCallback, createRef } from 'react';
import { Typography, makeStyles, Modal, DialogContent } from "@material-ui/core";
import { ClassListTable } from "components";
import { getClassList, getAllClasses, updateStudent, saveStudent } from 'services';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import { ClassListType, ClassType, NewStudent, Notify, Student, StudentOnClassList } from 'types';
import styles from 'styles/students.module.scss';
import { Button, SearchField, EditStudentForm, FlashNotification, AddStudentForm } from 'components';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';


const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: theme.spacing(2)
        },
        selectClass: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1)
        },
        heading: {
            display: "flex",
            justifyContent: "center",
        }
    };
});

const ClassListPage = () => {

    const [classToFetch, setClassToFetch] = useState<string>('');
    // state to all the class list so that we can select the desired class list from
    const [allClassLists, setAllClassLists] = useState<ClassType[]>([]);
    // state to hold the current classlist to display
    const [currentClassList, setCurrentClassList] = useState<ClassListType | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    // states used to edit students and manipulated a group of
    // selected students, will use this later to change the
    // class of a group of students at once
    const [openEditStudentModal, setOpenEditStudentModal] = useState<boolean>(false);
    // modal to add new student
    const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false);
    // students selected from the table, used in handleSelected method
    const [selectedStudents, setSelectedStudents] = useState<Student[]>();
    // used to edit student's personal info
    const [editStudent, setEditStudent] = useState<Student | undefined>();
    // this state is used to indicate we want to add a new student
    const [addStudent, setAddStudent] = useState<boolean>(false);

    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});

    const classes = useStyles();

    // used to redirect and other router stuffs
    const router = useRouter();

    // used for modal child so it can keep track of. Don't know why but AddStudentForm is considered a
    // component that needs a ref and not EditStudentForm
    const ref = createRef<HTMLDivElement>();

    const getCurrentClassList = useCallback(async() => {
        try {
            const list = await getClassList(classToFetch);
            setCurrentClassList(list);
        } catch (error: any) {
            console.log(error);
        }
    }, [classToFetch]);

    // This one is to fetch for classes
    useEffect(() => {
        if (classToFetch !== '') {
            getCurrentClassList();
        }
    }, [classToFetch, getCurrentClassList]);

    const fetchAllClasses = async() => {
        try {
            const allClasslist: ClassType[] = await getAllClasses();                
            setAllClassLists(allClasslist);
        } catch (error: any) {
            console.log(error);
        }
        
    };

    // This one is to search for the list od students
    useEffect(() => {
        fetchAllClasses();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClassToFetch(event.target.value);
    };
    
     // filter according to search state or return the whole data
    const filteredStudents = searchText ? currentClassList?.students.filter(data => {
        return data.firstName.toLowerCase().includes(searchText);
    }) : currentClassList?.students;


    const handleSearchCancel = () => {
        setSearchText("");
    };

    // set the student to edit and open modal
    const handleEdit = () => {
        setOpenEditStudentModal(true);
        // setEditStudent(student);
        // console.log(student);
    };

    // set the student to edit and open modal
    const handleSelected = (selectedStudents: StudentOnClassList[]) => {
        setSelectedStudents(selectedStudents);
        // if 1 student is selected, we can edit his personal infos
        selectedStudents?.length === 1 ? setEditStudent(selectedStudents[0]) : setEditStudent(undefined);
    };

    const handleUpdateStudent = async (student: Student) => {
        try {
            const updatedStudent: Student = await updateStudent(student);
            getCurrentClassList();
        } catch (error) {
            console.log(error);
        }
        setOpenEditStudentModal(false);
    };
    
      const handleStudentDiscard = () => {
        setOpenEditStudentModal(false);
      };
    
    const handleCloseModal = () => {
        setOpenEditStudentModal(false);
        setOpenAddStudentModal(false);
    };

    // Used to save new student
    const handleSaveNewStudent = async (newStudent: NewStudent) => {
        try {
            const res = await saveStudent(newStudent);
            setNotify({
                isOpen: true,
                message: "Student saved successfully",
                type: "success"
            });
            handleCloseModal();
        } catch (error: any) {
            setNotify({
                isOpen: true,
                message: error,
                type: "error"
            });
        }        
    };

    // fxn used to open the modal and add the form to add register student in it
    const handleAddStudent = () => {
        setOpenAddStudentModal(true);
    };


    return (
        <div className={styles.root}>

            <FlashNotification notify={notify} setNotify={setNotify} />

            <Modal
                open={openEditStudentModal}
                onClose={handleCloseModal}
            >

                {/** I use a paragraph here because of error indicating modal can only take ReactNode or JSX */}
                <DialogContent>
                    {editStudent ? <EditStudentForm handleUpdateStudent={handleUpdateStudent} handleStudentDiscard={handleStudentDiscard} student={editStudent} /> : <div>No student selected</div>}
                </DialogContent>
            </Modal>
            <Modal
                open={openAddStudentModal}
                onClose={handleCloseModal}
            >
                <DialogContent>
                    <AddStudentForm handleCancel={handleCloseModal} handleSubmit={handleSaveNewStudent} ref={ref} />
                </DialogContent>
            </Modal>

            <Typography className={styles.heading} variant="h4">
                List of Students
            </Typography>

            <Grid container className={styles.content}>
                {/* <div className={styles.inputs}> */}
                    <Grid item xs={12} sm={6} className={styles.selectTextField}>
                        <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Class" onChange={handleChange}>
                            {allClassLists.map(classList => {                
                                return (
                                    <MenuItem key={classList.id} value={classList.id}>
                                        {classList.name}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                        <p><small>* Select a class to view students</small></p>
                    </Grid>
                    <Grid item className={styles.button}>
                        {editStudent ? <Button handleClick={handleEdit} label="Edit Student"><EditIcon /></Button>
                                    : <Button handleClick={handleAddStudent} label="Add Student"><PersonAddIcon /></Button>}
                    </Grid>
                {/* </div> */}
            
                
            </Grid>

            <div className={styles.table}>
                <SearchField
                    handleSearchCancel={handleSearchCancel}
                    setSearchText={setSearchText}
                    searchText={searchText}
                />
                {filteredStudents && <ClassListTable classList={filteredStudents} setSelectedStudents={handleSelected}/>}
            </div>
            

        </div>
    );
};

export default ClassListPage;