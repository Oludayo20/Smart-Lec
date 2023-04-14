import React from 'react';
import Avatar from '@mui/material/Avatar';

const Cls = (cls) => {
  console.log(cls);
  const { class_id, class_name, teacher_name, num_students } = cls.cls;

  const getClassById = (id) => {
    console.log(id);
  };

  return (
    <>
      <>
        <tbody className="text-sm font-medium divide-y divide-slate-900">
          {/* Row */}
          <tr
            key={class_id}
            className="border-3"
            onClick={() => getClassById(class_id)}
          >
            <td className="p-2">
              <div className="flex items-center">
                <div className="shrink-0 mr-2 sm:mr-3" width="36" height="36">
                  <Avatar style={{ backgroundColor: 'green' }}>P1</Avatar>
                </div>

                <div className="text-slate-800">{class_name}</div>
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {teacher_name ? teacher_name : 'No Teacher Assign'}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center text-green-500">{num_students}</div>
            </td>
            <td className="p-2">
              <div className="text-center">267</div>
            </td>
            <td className="p-2">
              <div className="text-center text-sky-500">4.7%</div>
            </td>
          </tr>
        </tbody>
      </>
    </>
  );
};

export default Cls;
