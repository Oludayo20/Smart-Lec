import { store } from '../../app/store';
import { clsApiSlice } from '../classes/clsApiSlice';
import { studentsApiSlice } from '../student/studentApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { subjectsApiSlice } from '../subjects/subjectsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      clsApiSlice.util.prefetch('getCls', 'clsList', { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
    store.dispatch(
      studentsApiSlice.util.prefetch('getStudents', 'studentList', {
        force: true
      })
    );
    store.dispatch(
      subjectsApiSlice.util.prefetch('getSubjects', 'subjectList', {
        force: true
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
