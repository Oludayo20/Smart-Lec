import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Dashboard from './components/Dashboard';
import ClsList from './features/classes/ClassList';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import ClsDetails from './features/classes/ClsDetails';
import NewCls from './features/classes/NewCls';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import useTitle from './hooks/useTitle';
import P404P from './components/P404P';
import HeroHome from './components/HeroHome';

function App() {
  useTitle('Smart Lecture');

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<P404P />} />

          {/* public routes */}
          <Route element={<Public />}>
            <Route index element={<HeroHome />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={['Admin', 'Teacher']} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Dashboard />} />

                  <Route
                    element={
                      <RequireAuth allowedRoles={['Admin', 'Teacher']} />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="class">
                    <Route index element={<ClsList />} />
                    <Route path="classDetails/:id" element={<ClsDetails />} />
                    <Route path="new" element={<NewCls />} />
                  </Route>
                </Route>
                {/* End Dash */}
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
