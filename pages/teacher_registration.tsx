import {useState} from "react";
import { AddTeacherForm, FlashNotification }  from 'components';
import { NewTeacher } from "types";
import { saveUser } from "services/user";
import { Notify } from 'types';

const TeacherRegistration = () => {
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});

    const handleSubmit = async (newTeacher: NewTeacher) => {
        try {
            const res = await saveUser(newTeacher);
            setNotify({
                isOpen: true,
                message: "Teacher saved successfully",
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
            <AddTeacherForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default TeacherRegistration;