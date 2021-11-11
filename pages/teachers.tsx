import React, { useState, useEffect } from 'react';
import { Teacher } from 'types';
import { getUsers } from 'services';
import { makeStyles, Typography } from '@material-ui/core';
import styles from 'styles/table.module.scss';
import { Table } from 'components'

const useStyles = makeStyles(theme => {
    return {
        root: {
            height: "550px",
            width: "100%",
            paddingTop: theme.spacing(5)
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
    }
})


const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>();
  const classes = useStyles();
  
  useEffect(() => {
    const fetchTeachers = async () => {      
      try {
        const receivedTeachers = await getUsers();
        setTeachers(receivedTeachers);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchTeachers();
  }, [])  

return (
  <div className={styles.root}>
    <Typography variant="h3">List of Teacher</Typography>
    {teachers && <Table tableData={teachers}/>}
  </div>
)

}

export default Teachers