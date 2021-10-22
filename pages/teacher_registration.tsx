import {useState} from "react";
import AddTeacherForm from "components/AddTeacherForm";
import { NewTeacher } from "types";
import teacherServices from "services/teacher";
import FlashNotification from "components/FlashNotification";
import { Notify } from 'types';

const TeacherRegistration = () => {
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});

    const handleSubmit = async (newTeacher: NewTeacher) => {
        try {
            const res = await teacherServices.saveTeacher(newTeacher);
            setNotify({
                isOpen: true,
                message: "Teacher saved successfully",
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
            <AddTeacherForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default TeacherRegistration;