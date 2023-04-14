import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { status } from './clsSlice';
import Spinner from '../../utils/Spinner';
import CreateCls from './createCls';
import Cls from './Cls';

const Clses = () => {
  const { cls } = useSelector(status);

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-12 py-8 w-full max-w-9xl mx-auto">
        {/* Create Class */}
        <CreateCls />
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">All Class</h2>
        </header>

        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Top Channels</h2>
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

                {cls.map((cls) => (
                  <Cls cls={cls} />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Clses;
