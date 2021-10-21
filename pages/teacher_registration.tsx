import React from "react";
import { Typography } from "@material-ui/core";
import AddTeacherForm from "components/AddTeacherForm";
import { NewStudent } from "types";

const TeacherRegistration = () => {

    const handleSubmit = (values: NewStudent) => {
        console.log(values);
        
    }

    const handleCancel = () => {
        console.log("Cancel");
        
    }

    return (
        <div>
            <AddTeacherForm handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        </div>
    );
}

export default TeacherRegistration;