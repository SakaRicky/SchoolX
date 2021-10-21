import React from "react";
import { Typography } from "@material-ui/core";
import AddStudentForm from 'components/AddStudentForm';
import { NewStudent } from "types";
import studentServices from "services/student";

const StudentRegistration = () => {

    const handleSubmit = async (newStudent: NewStudent) => {
        const res = await studentServices.saveStudent(newStudent);
    }

    return (

        <div>
            <AddStudentForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default StudentRegistration;