import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCls, reset, status } from '../classes/clsSlice';
import { getAllTeacher, reset as rst, status as stu } from './authSlice';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  const dispatch = useDispatch();

  const { isSuccess } = useSelector(status);
  const { isSuccess: scc } = useSelector(stu);

  useEffect(() => {
    dispatch(getCls());

    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllTeacher());
    if (scc) {
      dispatch(rst());
    }
  }, [dispatch, scc]);

  return <Outlet />;
};

export default Prefetch;
