import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    content = (
      <>
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color={'#09cb23'} />
        </div>
      </>
    );
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex p-3">
          <h1>Error Message:</h1> <p>{` - ${error?.data?.message}`}</p>
        </div>
        <p className="errmsg">
          <Link
            className="w-full text-center p-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
            to="/login"
          >
            Please login again
          </Link>
        </p>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
