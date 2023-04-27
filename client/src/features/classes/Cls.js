import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useGetClsQuery } from './clsApiSlice';
import { memo } from 'react';

const Cls = ({ clsId }) => {
  const { cls } = useGetClsQuery('clsList', {
    selectFromResult: ({ data }) => ({
      cls: data?.entities[clsId]
    })
  });

  const navigate = useNavigate();

  if (cls) {
    const handleEdit = () => navigate(`/dash/class/classDetails/${clsId}`);

    return (
      <>
        <tbody className="text-sm font-medium divide-y divide-slate-900">
          {/* Row */}
          <tr key={cls?.class_id} className="border-3" onClick={handleEdit}>
            <td className="p-2">
              <div className="flex items-center">
                <div className="shrink-0 mr-2 sm:mr-3" width="36" height="36">
                  <Avatar style={{ backgroundColor: 'green' }}>
                    {cls?.class_name[0]}
                    {''}
                    {cls?.class_name[cls?.class_name.length - 1]}
                  </Avatar>
                </div>

                <div className="text-slate-800">{cls?.class_name}</div>
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {cls?.teacher_name ? cls?.teacher_name : 'No Teacher'}
              </div>
            </td>
            <td className="p-1">
              <div className="text-center text-green-500">
                {cls?.num_students}
              </div>
            </td>
            <td className="p-1">
              <div className="text-center">11</div>
            </td>
            <td className="p-1">
              <div className="text-center text-sky-500">4.7%</div>
            </td>
          </tr>
        </tbody>
      </>
    );
  } else return null;
};
const memoizedNote = memo(Cls);
export default memoizedNote;
