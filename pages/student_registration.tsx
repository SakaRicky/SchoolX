import { useState } from 'react';
import {AddStudentForm, FlashNotification} from 'components';
import { NewStudent } from "types";
import { saveStudent } from "services";
import { Notify } from 'types';

const StudentRegistration = () => {
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});

    const handleSubmit = async (newStudent: NewStudent) => {
        try {
            const res = await saveStudent(newStudent);
            setNotify({
                isOpen: true,
                message: "Student saved successfully",
                type: "success"
            })
        } catch (error: any) {
            setNotify({
                isOpen: true,
                message: error,
                type: "error"
            })
        }        
    }

    return (

        <div>
            <FlashNotification notify={notify} setNotify={setNotify} />
            <AddStudentForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default StudentRegistration;