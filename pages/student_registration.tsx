import { useState } from 'react';
import AddStudentForm from 'components/AddStudenForm';
import { NewStudent } from "types";
import studentServices from "services/student";
import FlashNotification from "components/FlashNotification";
import { Notify } from 'types';

const StudentRegistration = () => {
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});

    const handleSubmit = async (newStudent: NewStudent) => {
        try {
            const res = await studentServices.saveStudent(newStudent);
            setNotify({
                isOpen: true,
                message: "Student saved successfully",
                type: "success"
            })
        } catch (error) {
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