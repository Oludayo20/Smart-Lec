import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { status } from '../features/Auth/authSlice';

const useAuth = () => {
  const { token } = useSelector(status);

  if (!token) {
    return { userData: [], isAdmin: false, isTeacher: false, role: null };
  }

  const decoded = jwtDecode(token);
  const userData = decoded.UserData;

  const isAdmin = userData.role === 'Admin';
  const isTeacher = userData.role === 'Teacher';
  const role = isAdmin ? 'Admin' : isTeacher ? 'Teacher' : null;

  return { userData, role, isAdmin, isTeacher };
};

export default useAuth;
