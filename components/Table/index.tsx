import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import styles from 'styles/table.module.scss';
import { StudentOnClassList, Teacher } from 'types';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link'


interface TableProps {
    tableData: (Teacher | StudentOnClassList)[]
}

export const Table = ({tableData}: TableProps) => {

    const [searchText, setSearchText] = useState<string>("");
    
    
    const [editUser, setEditUser] = useState<Teacher>();

    // check if tableData received is User(teacher)
    const isUser = (obj: any): obj is Teacher => {
        return obj.hasOwnProperty('phone')
    };
    
    let tableHead = undefined;

    if (isUser(tableData[0])) {
        tableHead = (<tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone Number</th>
        </tr>)
    } else {
        tableHead = (<tr>
            <th>Number</th>
            <th>Matricule</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Father Name</th>
            <th>Father Contact</th>
        </tr>)
    }

    // filter according to search state
    const filteredData = searchText ? tableData.filter(data => {
        return data.first_name.includes(searchText)
    }) : tableData;


    const handleSearchCancel = () => {
        setSearchText("");
    }

    const rows =  filteredData?.map(content => {        
        // if it's a user(not a student), render these values
        if (isUser(content)) {
            return (
                <tbody key={content.id}>
                    <Link href={`teachers/${content.id}`} passHref={true}>
                        <tr>
                            <td>{content.id}</td>
                            <td>{content.first_name + " "  + content.last_name}</td>
                            <td>{content.date_of_birth}</td>
                            <td>{content.gender}</td>
                            <td>{content.phone}</td>
                        </tr>
                    </Link>
                </tbody>
              )
        }

        return (
            <tbody key={content.id}>
                    <Link href={`students/${content.id}`} passHref={true}>
                        <tr>
                            <td>{content.number}</td>
                            <td>{content.id}</td>
                            <td>{content.first_name + " "  + content.last_name}</td>
                            <td>{content.date_of_birth}</td>
                            <td>{content.gender}</td>
                            <td>{content.fathers_name}</td>
                            <td>{content.fathers_phone}</td>
                        </tr>
                    </Link>
                </tbody>
        )
        
    });

    return (
        <>
            <div className={styles.root}>
                
                <div className={styles.tableWrapper}>
                    <div className={styles.filter}>
                        <TextField
                            label="Filter"
                            helperText="type to search"
                            fullWidth
                            value={searchText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                        />
                        <span onClick={handleSearchCancel}><CloseIcon /></span>
                    </div>
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                {tableHead}
                            </tbody>
                            {filteredData.length !== 0 &&  rows}
                        </table>
                    </div>
                </div>
                {/* Rendering it here because table only accepts tbody, tr,td etc... */}
                {filteredData.length === 0 ? <Typography className={styles.notFound} variant="h4">No Data Found</Typography> : null}
            </div>
        </>
    )
}

