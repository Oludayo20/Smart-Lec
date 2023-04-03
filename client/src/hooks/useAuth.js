import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { status } from '../features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const useAuth = () => {
  const navigate = useNavigate();
  const { token } = useSelector(status);

  if (token) {
    const decoded = jwtDecode(token);
    const userData = decoded.UserInfo;

    console.log(userData);

    return userData;
  }

  return { userData: [] };
};

export default useAuth;
