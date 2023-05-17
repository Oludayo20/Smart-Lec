import { useParams } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { useGetUsersQuery } from './subjectsApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const EditUser = ({ id }) => {
  const { user } = useGetUsersQuery('usersList', {
    selectFormResult: ({ data }) => ({
      user: data?.entities[id]
    })
  });

  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <PulseLoader color={'#fff'} />
  );

  return content;
};
export default EditUser;
