import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Grid
} from '@material-ui/core';
import { MarksEntryListType, StudentOnMarksEntry } from 'types';
import { saveMarks } from 'services';


// For now we use the id as matriculestudents
interface Column {
  // value in the student object to display
  detail: 'number' | 'id' | 'names' | 'marks';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  format?: (value: number) => string;
}

const columns: Column[] = [
  { detail: 'number', label: 'Number', minWidth: 70 },
  { detail: 'id', label: 'Matricule', minWidth: 60 },
  {
    detail: 'names',
    label: 'Names',
    minWidth: 70,
  },
  {
    detail: 'marks',
    label: 'Student Marks',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  }
];

const useStyles = makeStyles(theme => {
  return {
    root: {
        // width: '100%',
      },
      container: {
        // backgroundColor: theme.palette.secondary.main,
        textAlign: "center",
        // borderTopRightRadius: 15,
      },
      table: {

          
      },
      tableHeadCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.secondary[200],
        fontSize: '1rem',
        color: theme.palette.secondary[900],
        textAlign: "center",
      },

      tableCell: {
        textAlign: "center",
        color: theme.palette.myGrey[900]
      },
      submit: {
          display: 'flex',
          justifyContent: 'center',
          margin: theme.spacing(2)
      },
      submitButton: {
        backgroundColor: theme.palette.primary.light,
        color: "white",
        borderRadius: '50px',
        paddingInline: "2rem",
        paddingBlock: "0.7rem",
        transition: theme.transitions.create(['background-color', 'transform'], {
          duration: theme.transitions.duration.standard,
        }),

        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary[700],
            transform: 'scale(1.05)'
        }
      },
      space: {
          height: theme.spacing(2)
      }
  }
});

interface MarksEntryListProps {
    seqClass: MarksEntryListType,
    submitMarks: (marks: MarksEntryListType) => void
}

interface NumberedStudentOnMarksEntry extends StudentOnMarksEntry {
    number: number
}

export const MarksEntryTable = ({seqClass, submitMarks}: MarksEntryListProps) => {
  const classes = useStyles();
  const [savedStudents, setSavedStudents] = useState<StudentOnMarksEntry[]>(seqClass.students);
  
  useEffect(() => {
    setSavedStudents(seqClass.students);
  }, [seqClass])

  savedStudents.sort((student1, student2) => {
      const name1 = student1.names.toUpperCase();
      const name2 = student2.names.toUpperCase();
      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
  });

  const numberedStudents: NumberedStudentOnMarksEntry[] = savedStudents.map((student, idx) => {
      return {number: idx+1, ...student}
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, student: StudentOnMarksEntry) => {
    const updatedSavedStudent = savedStudents.map(savedStudent => {
        if (savedStudent.id === student.id) {
            return {
                ...savedStudent,
                marks: Number(event.target.value)
            }
        }
        return savedStudent
    })
    setSavedStudents(updatedSavedStudent);
    
  }

  const handleSubmit = () => {
    const seqClassToSave = {
        ...seqClass,
        students: savedStudents
    }
    submitMarks(seqClassToSave);   
  }

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.tableHeadCell}
                  key={column.detail}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {numberedStudents.map((student: NumberedStudentOnMarksEntry) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                  {columns.map((column, idx) => {                      
                    const value = student[column.detail];
                    
                    if (idx === 3) {                                              
                        return (
                            <TableCell key={column.detail} className={classes.tableCell}>
                                <TextField variant="outlined" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, student)} />
                            </TableCell>
                        )
                    }
                    return (
                      <TableCell key={column.detail} className={classes.tableCell}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.submit}>
            <Button className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
      </div>
      <div className={classes.space} />
    </div>
  );
}