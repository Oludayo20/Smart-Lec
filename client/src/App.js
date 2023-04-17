import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import HeroHome from './components/HeroHome';
import Header, { WelcomeHeader } from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './features/Auth/Login';
import Logout from './features/Auth/Logout';
import Register from './features/Auth/Register';
import QuizForm from './features/Quiz/QuizForm';
import Layout from './components/Layout';
import QuizList from './features/Quiz/QuizList';
import RequireAuth from './features/Auth/RequireAuth';
import Prefetch from './features/Auth/Prefetch';
import AllCls from './features/classes/AllCls';
import ClsDetails from './features/classes/ClsDetails';
import PersistLogin from './features/Auth/PresistLogin';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);
  // triggered on route change

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomeHeader />}>
          <Route index element={<HeroHome />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<Prefetch />}>
          <Route element={<RequireAuth allowedRoles={['Admin', 'Teacher']} />}>
            <Route path="dash" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="classes" element={<AllCls />} />
              <Route path="classDetails/:id" element={<ClsDetails />} />
              <Route path="quizForm" element={<QuizForm />} />
              <Route path="quizzes" element={<QuizList />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
