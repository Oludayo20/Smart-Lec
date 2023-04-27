import NewClsForm from './NewClsForm';
import { useGetUsersQuery } from '../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const NewCls = () => {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id])
    })
  });

  if (!users?.length) return <PulseLoader color={'#09cb23'} />;

  const content = <NewClsForm users={users} />;

  return content;
};
export default NewCls;
