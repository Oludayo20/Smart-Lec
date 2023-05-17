import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useGetSubjectsQuery } from './subjectsApiSlice';
import { memo } from 'react';

const Subject = ({ subjectId }) => {
  const { subject } = useGetSubjectsQuery('subjectList', {
    selectFromResult: ({ data }) => ({
      subject: data?.entities[subjectId]
    })
  });

  const navigate = useNavigate();

  if (subject) {
    const subjectDetails = () =>
      navigate(`/dash/subject/subjectDetails/${subjectId}`);

    return (
      <>
        <tbody className="text-sm font-medium divide-y divide-slate-900">
          {/* Row */}
          <tr
            key={subject?.class_id}
            className="border-3"
            onClick={subjectDetails}
          >
            <td className="p-2">
              <div className="flex items-center">
                <div className="shrink-0 mr-2 sm:mr-3" width="36" height="36">
                  <Avatar style={{ backgroundColor: 'green' }}>
                    {subject?.subject_name[0]}
                  </Avatar>
                </div>

                <div className="text-slate-800">{subject?.subject_name}</div>
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {subject?.class_name
                  ? `${subject?.class_name[0]}${
                      subject?.class_name[subject?.class_name.length - 1]
                    }`
                  : 'No Class'}
              </div>
            </td>
            <td className="p-1">
              <div className="text-center">
                {subject?.note ? '1 Note' : 'No Note'}
              </div>
            </td>
            <td className="p-1">
              <div className="text-center">
                {subject?.note_pdf ? '1 NotePdf' : 'No NotePdf'}
              </div>
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
const memoizedNote = memo(Subject);
export default memoizedNote;
