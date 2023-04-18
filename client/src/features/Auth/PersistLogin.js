import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import usePersist from '../../hooks/usePersist';
import { useDispatch, useSelector } from 'react-redux';
import { refresh, status } from './authSlice';
import Spinner from '../../utils/Spinner';

const PersistLogin = () => {
  const [persist] = usePersist();
  const dispatch = useDispatch();

  const { token, isLoading, isSuccess, isError, message } = useSelector(status);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      console.log('verifying refresh token');
      try {
        dispatch(refresh());
      } catch (err) {
        console.error(err);
      } finally {
        isMounted = false;
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    if (!token && persist) verifyRefreshToken();

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`persist: ${persist}`);
    console.log(`aT: ${JSON.stringify(token)}`);
  }, [isLoading, persist]);

  return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
