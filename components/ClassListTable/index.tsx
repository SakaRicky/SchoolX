
import { Table } from 'components';
import { Student, StudentOnClassList } from 'types';

interface ClassListProps {
    classList: Student[],
    setSelectedStudents: (selectedStudents: StudentOnClassList[]) => void
}

export const ClassListTable = ({classList, setSelectedStudents}: ClassListProps) => {  

  classList.sort((student1, student2) => {
      const name1 = student1.firstName.toUpperCase();
      const name2 = student2.firstName.toUpperCase();
      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
  });

  const numberedClassList: StudentOnClassList[] = classList.map((student, idx) => {
      return {number: idx+1, ...student};
  });  

  return (
    <Table tableData={numberedClassList} setSelectedRows={setSelectedStudents} />
  );
};