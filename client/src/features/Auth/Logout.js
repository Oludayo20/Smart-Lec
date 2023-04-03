import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset, status } from './authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, message } = useSelector(status);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate('/login');
    }

    dispatch(reset());
  }, [isSuccess, message, navigate, dispatch, toast, reset]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <button
        className="font-medium text-sm text-green-500 hover:text-green-900 flex items-center py-1 px-3"
        onClick={handleLogout}
        disabled={isLoading ? true : false}
      >
        Sign Out
      </button>
    </>
  );
};

export default Logout;
