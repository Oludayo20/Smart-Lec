import EditStudentForm from './EditStudentForm';
import { useGetStudentsQuery } from './studentApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const EditStudent = ({ studentId }) => {
  console.log(studentId);

  const { student } = useGetStudentsQuery('studentList', {
    selectFormResult: ({ data }) => ({
      student: data?.entities[studentId]
    })
  });

  console.log(student);

  const content = student ? (
    <EditStudentForm user={student} />
  ) : (
    <PulseLoader size={'5px'} color={'#22c55e'} />
  );

  return content;
};
export default EditStudent;
