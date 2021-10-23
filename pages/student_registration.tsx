import AddStudentForm from 'components/AddStudenForm';
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