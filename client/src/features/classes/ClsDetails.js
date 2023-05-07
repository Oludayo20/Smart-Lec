import { useParams, Link } from 'react-router-dom';
import { useGetClassByIdQuery } from './clsApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import Avatar from '@mui/material/Avatar';
import EditCls from './EditCls';
import NewStudentForm from '../student/NewStudentForm';
import EditStudent from '../student/EditStudent';

const ClsDetails = () => {
  const { id } = useParams();

  const {
    data: clses,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetClassByIdQuery(id);

  let content;

  if (isLoading || isFetching)
    return (content = (
      <>
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color={'#09cb23'} />
        </div>
      </>
    ));

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = clses;

    const cls = entities[ids];

    let clsCard = (
      <>
        <div className="mt-4 mb-6 col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 flex justify-between items-start py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Class Details</h2>
          </header>

          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">class name</div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Num of Teacher
                      </div>
                    </th>
                    <th className="p-">
                      <div className="font-semibold text-center">
                        Num of Student
                      </div>
                    </th>
                    <th className="p-">
                      <div className="font-semibold text-center">
                        Num of Subjects
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Performance
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody
                  key={cls?.class_id}
                  className="text-sm font-medium divide-y divide-slate-900"
                >
                  {/* Row */}
                  <tr className="border-3">
                    <td className="p-2">
                      <div className="flex items-center">
                        <div
                          className="shrink-0 mr-2 sm:mr-3"
                          width="36"
                          height="36"
                        >
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
                      <div className="text-center">{cls?.teachers.length}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                        {cls?.students.length}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{cls?.subjects.length}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">4.7%</div>
                    </td>
                    <td className="p-2">
                      {/* <div className="text-center text-sky-500"> */}
                      <EditCls />
                      {/* </div> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );

    let teacherCard = (
      <>
        <div className="mt-4 mb-6 col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Teacher Details</h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">
                        Teacher name
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">Email</div>
                    </th>
                    <th className="p-">
                      <div className="font-semibold text-center">Phone Num</div>
                    </th>

                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Performance
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {cls?.teachers.map((teacher) => (
                  <tbody
                    key={teacher?.teacher_id}
                    className="text-sm font-medium divide-y divide-slate-900"
                  >
                    {/* Row */}
                    <tr className="border-3">
                      <td className="p-2">
                        <div className="flex items-center">
                          <div
                            className="shrink-0 mr-2 sm:mr-3"
                            width="36"
                            height="36"
                          >
                            <Avatar style={{ backgroundColor: 'green' }}>
                              {/* {teacher.profile_pic !== 'Avatar' &&
                              teacher.profile_pic} */}
                            </Avatar>
                          </div>

                          <div className="text-slate-800">{teacher.name}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{teacher.email}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{teacher.phone_num}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">71.2%</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-green-700">
                          Edit User
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </>
    );

    let studentCard = (
      <>
        <div className="mt-4 mb-6 col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 flex justify-between items-start py-4 border-b border-slate-100">
            <h2 className="mt-3 font-semibold text-slate-800">
              Student Details
            </h2>
            <NewStudentForm clsId={cls?.class_id} />
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">
                        Student name
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">Adm Num</div>
                    </th>
                    <th className="p-">
                      <div className="font-semibold text-center">email</div>
                    </th>

                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Performance
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {cls?.students.map((student) => (
                  <tbody
                    key={student?.student_id}
                    className="text-sm font-medium divide-y divide-slate-900"
                  >
                    {/* Row */}
                    <tr className="border-3">
                      <td className="p-2">
                        <div className="flex items-center">
                          <div
                            className="shrink-0 mr-2 sm:mr-3"
                            width="36"
                            height="36"
                          >
                            <Avatar
                              style={{ backgroundColor: 'green' }}
                            ></Avatar>
                          </div>

                          <div className="text-slate-800">{student.name}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {student.admission_num}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {student.email ? student.email : 'No email'}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">61.5%</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-green-700">
                          <EditStudent studentId={student?.student_id} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </>
    );

    let subjectCard = (
      <>
        <div className="mt-4 mb-6 col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Subject Details</h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">
                        Subject name
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Subject note
                      </div>
                    </th>
                    <th className="p-">
                      <div className="font-semibold text-center">
                        subject pdf
                      </div>
                    </th>

                    <th className="p-1">
                      <div className="font-semibold text-center">
                        Performance
                      </div>
                    </th>
                    <th className="p-1">
                      <div className="font-semibold text-center">action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {cls?.subjects.map((subject) => (
                  <tbody
                    key={subject?.subject_id}
                    className="text-sm font-medium divide-y divide-slate-900"
                  >
                    {/* Row */}
                    <tr
                      className="border-3"
                      // onClick={() => getClassById(class_id)}
                    >
                      <td className="p-2">
                        <div className="flex items-center">
                          <div
                            className="shrink-0 mr-2 sm:mr-3"
                            width="36"
                            height="36"
                          >
                            <Avatar style={{ backgroundColor: 'green' }}>
                              {subject?.subject_name[0]}
                            </Avatar>
                          </div>

                          <div className="text-slate-800">
                            {subject?.subject_name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {subject?.subject_note ? (
                            subject?.subject_note
                          ) : (
                            <>
                              <h1>No Note</h1>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {subject?.subject_pdf ? (
                            subject?.subject_pdf
                          ) : (
                            <>
                              <h1>No Pdf</h1>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">56.8%</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-green-700">
                          Edit Sub
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </>
    );

    let content = (
      <>
        <main>
          <div className="bg-green-500 px-4 sm:px-6 lg:px-12 py-8 w-full max-w-9xl mx-auto">
            <div>
              {clsCard}
              <div className="">{teacherCard}</div>
              <div className="">{studentCard}</div>
              <div className="">{subjectCard}</div>
            </div>
          </div>
        </main>
      </>
    );

    return content;
  }

  return content;
};
export default ClsDetails;
