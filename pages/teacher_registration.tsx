import React from "react";
import { Typography } from "@material-ui/core";
import AddTeacherForm from "components/AddTeacherForm";
import { NewTeacher } from "types";
import teacherServices from "services/teacher";

const TeacherRegistration = () => {

    const handleSubmit = async (newTeacher: NewTeacher) => {
        const res = await teacherServices.saveTeacher(newTeacher);        
    }

    return (
        <div>
            <AddTeacherForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default TeacherRegistration;