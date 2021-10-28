import { useState, useEffect } from 'react';
import { Typography, makeStyles } from "@material-ui/core";
import ClassList from "components/ClassList";
import classListServices from 'services/classList';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import { ClassListType, ClassType } from 'types';

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
                const list = await classListServices.getClassList(classToFetch);                
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
        const getAllClasses = async() => {
            try {
                const allClasslist: ClassType[] = await classListServices.getAllClasses();                
                setAllClassLists(allClasslist);
            } catch (error: any) {
                console.log(error);
            }
            
        }
        getAllClasses();
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassToFetch(event.target.value);
    }    

    return (
        <div className={classes.root}>

            <div className={classes.heading}>
                <Typography variant="h4">
                    Class List
                </Typography>
            </div>

            <Grid container spacing={2} className={classes.selectClass}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Class" onChange={handleChange}>
                        {allClassLists.map(classList => {                
                            return (
                                <MenuItem key={classList.id} value={classList.id}>
                                    {classList.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Grid>
            </Grid>

            <hr />
            
            {currentClassList && <ClassList classList={currentClassList?.students}/>}

        </div>
    );
}

export default ClassListPage;