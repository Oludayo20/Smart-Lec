import { useGetSubjectsQuery } from './subjectsApiSlice';
import Subject from './Subject';
import NewSubject from './NewSubject';
import PulseLoader from 'react-spinners/PulseLoader';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const SubjectList = () => {
  const {
    data: subject,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSubjectsQuery('subjectList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const userDate = useAuth();
  const { firstName, surname } = userDate.userData;

  let content;

  if (isLoading) content = <PulseLoader color={'#09cb23'} />;

  if (isError) {
    toast.error(error?.data?.message);
  }

  if (isSuccess) {
    const { ids } = subject;

    const tableContent =
      ids?.length &&
      ids.map((subjectId) => <Subject key={subjectId} subjectId={subjectId} />);

    content = (
      <>
        {/* Create Class */}
        <header className="px-5 py-4 border-b border-slate-100">
          <WelcomeBanner firstName={[surname, ' ', firstName]} />
          <NewSubject />
        </header>

        <div className="mt-4 col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">All Class</h2>
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
                        subject name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        class Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Note</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">NotePdf</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Performance
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                {tableContent}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};
export default SubjectList;
