import { useParams } from 'react-router-dom';
import EditStudentForm from './EditStudentForm';
import { useGetStudentQuery } from './studentApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const EditStudent = ({ studentId }) => {
  console.log(studentId);

  const { student } = useGetStudentQuery('studentsList', {
    selectFormResult: ({ data }) => ({
      student: data?.entities[studentId]
    })
  });

  const { user } = useGetStudentQuery('studentsList', {
    selectFormResult: ({ data }) => ({
      user: data?.entities[studentId]
    })
  });

  console.log(user);

  console.log(student);

  const content = student ? (
    <EditStudentForm user={student} />
  ) : (
    <PulseLoader color={'#09cb23'} />
  );

  return content;
};
export default EditStudent;
