import EditStudentForm from './EditStudentForm';
import { useGetStudentQuery } from './studentApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const EditStudent = ({ studentId }) => {
  console.log(studentId);

  const student = useGetStudentQuery('studentList', {
    selectFormResult: ({ data }) => ({
      student: data?.entities[studentId]
    })
  });

  console.log(student);

  const content = student ? (
    <EditStudentForm user={student} />
  ) : (
    <PulseLoader color={'#22c55e'} />
  );

  return content;
};
export default EditStudent;
