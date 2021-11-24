import { useState, useEffect, ChangeEvent } from 'react';
import { Typography, makeStyles } from "@material-ui/core";
import ClassList from "components/ClassList";
import { getClassList, getAllClasses } from 'services';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import { ClassListType, ClassType } from 'types';
import styles from 'styles/students.module.scss';
import { Button } from 'components';

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
    }
});

const ClassListPage = () => {

    // state to hold the current classlist to display
    const [currentClassList, setCurrentClassList] = useState<ClassListType | null>(null);
    const [classToFetch, setClassToFetch] = useState<string>('');
    // state to all the class list so that we can select the desired class list from
    const [allClassLists, setAllClassLists] = useState<ClassType[]>([]);

    const classes = useStyles();

    useEffect(() => {
        const getCurrentClassList = async() => {
            try {
                const list = await getClassList(classToFetch);                
                setCurrentClassList(list);
            } catch (error: any) {
                console.log(error);
                
            }
        }
        if (classToFetch !== '') {
            getCurrentClassList()
        }
    }, [classToFetch])

    useEffect(() => {
        const fetchAllClasses = async() => {
            try {
                const allClasslist: ClassType[] = await getAllClasses();                
                setAllClassLists(allClasslist);
            } catch (error: any) {
                console.log(error);
            }
            
        }
        fetchAllClasses();
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClassToFetch(event.target.value);
    }    

    return (
        <div className={styles.root}>

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
                                )
                            })}
                        </TextField>
                        <p><small>* Select a class to view students</small></p>
                    </Grid>
                    <Grid item className={styles.button}><Button label="Add Student"/></Grid>
                {/* </div> */}
            
                
            </Grid>

            <div className={styles.table}>
                {currentClassList && <ClassList classList={currentClassList?.students}/>}
            </div>
            

        </div>
    );
}

export default ClassListPage;