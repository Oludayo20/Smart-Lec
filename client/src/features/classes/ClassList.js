import { useGetClsQuery } from './clsApiSlice';
import Cls from './Cls';
import NewCls from './NewCls';
import PulseLoader from 'react-spinners/PulseLoader';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import useAuth from '../../hooks/useAuth';

const ClassList = () => {
  const {
    data: cls,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetClsQuery('clsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const userDate = useAuth();
  const { firstName, surname } = userDate.userData;

  let content;

  if (isLoading) content = <PulseLoader color={'#09cb23'} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = cls;

    const tableContent =
      ids?.length && ids.map((clsId) => <Cls key={clsId} clsId={clsId} />);

    content = (
      <>
        {/* Create Class */}
        <header className="px-5 py-4 border-b border-slate-100">
          <WelcomeBanner firstName={[surname, ' ', firstName]} />
          <NewCls />
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
                      <div className="font-semibold text-left">class name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Teacher Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Num of Student
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Num of Subjects
                      </div>
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
export default ClassList;
