import { useParams } from 'react-router-dom';
import EditClsForm from './EditClsForm';
import { useGetClsQuery } from './clsApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const EditNote = () => {
  const { id } = useParams();

  const { isTeacher, isAdmin } = useAuth();

  const { cls } = useGetClsQuery('clsList', {
    selectFromResult: ({ data }) => ({
      cls: data?.entities[id]
    })
  });

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id])
    })
  });

  if (!cls || !users?.length) return <PulseLoader color={'#09cb23'} />;

  if (!isTeacher && !isAdmin) {
    return toast.error('Unauthorized');
  }

  const content = <EditClsForm cls={cls} users={users} />;
  return content;
};
export default EditNote;
