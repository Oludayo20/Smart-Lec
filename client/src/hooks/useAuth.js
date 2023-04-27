import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isTeacher = false;
  let isAdmin = false;
  let isStudent = false;

  if (token) {
    const decoded = jwtDecode(token);
    const userData = decoded.UserData;

    const isAdmin = userData.role === 'Admin';
    const isTeacher = userData.role === 'Teacher';
    const role = isAdmin ? 'Admin' : isTeacher ? 'Teacher' : null;

    return { userData, role, isAdmin, isTeacher };
  }

  return { userData: {}, role: [], isAdmin, isTeacher, isStudent };
};
export default useAuth;
