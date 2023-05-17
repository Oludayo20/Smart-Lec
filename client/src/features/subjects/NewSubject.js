import NewSubjectForm2 from './NewSubjectForm2';
import { useGetClsQuery } from '../classes/clsApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const NewCls = () => {
  const { cls } = useGetClsQuery('clsList', {
    selectFromResult: ({ data }) => ({
      cls: data?.ids.map((id) => data?.entities[id])
    })
  });

  if (!cls?.length) return <PulseLoader color={'#09cb23'} />;

  const content = <NewSubjectForm2 cls={cls} />;

  return content;
};
export default NewCls;
