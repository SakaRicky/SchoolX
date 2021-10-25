import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'types';

interface Column {
  id: 'number' | 'id' | 'first_name' | 'last_name' | 'date_of_birth' | 'gender' | 'fathers_name' | 'fathers_phone';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'number', label: 'Number', minWidth: 70 },
  { id: 'id', label: 'Matricule', minWidth: 60 },
  {
    id: 'first_name',
    label: 'First Name',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'last_name',
    label: 'Last Name',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date_of_birth',
    label: 'Date of Birth',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'gender',
    label: 'Gender',
    maxWidth: 10,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'fathers_name',
    label: 'Father Name',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'fathers_phone',
    label: 'Father Phone',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface StudentData {
  number: number;
  matricule: string;
  names: string;
  dateOfBirth: string;
  picture: string;
}

function createData(number: number, matricule: string, names: string, dateOfBirth: string, picture: string): StudentData {
  return { number, matricule, names, dateOfBirth, picture };
}

const useStyles = makeStyles(theme => {
  return {
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 840,
      },
      tableHead: {
          fontWeight: 900
      }
  }
});

interface ClassListProps {
    classList: Student[]
}

const ClassList = ({classList}: ClassListProps) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  classList.sort((student1, student2) => {
      const name1 = student1.first_name.toUpperCase();
      const name2 = student2.first_name.toUpperCase();
      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
  });

  const numberedClassList = classList.map((student, idx) => {
      return {number: idx+1, ...student}
  });  

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.tableHead}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {numberedClassList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {                      
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={numberedClassList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ClassList;