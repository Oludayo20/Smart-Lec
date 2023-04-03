import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login, reset, status } from './authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';
import './LogReg.css';

export const Login = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState('');

  const [pwd, setPwd] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(status);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(`Welcome Back`);
      navigate('/dash');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, toast, reset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    if (!email || !pwd) {
      return toast.error('Please input email and password');
    } else {
      const userData = {
        email,
        password: pwd
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                ref={emailRef}
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-describedby="uidnote"
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-describedby="pwdnote"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                disabled={isLoading || !email || !pwd ? true : false}
              >
                Log In
              </button>
              <div className="persistCheck">
                <input
                  type="checkbox"
                  className="bg-green-400"
                  id="persist"
                  // onChange={togglePersist}
                  // checked={persist}
                />
                <label htmlFor="persist">Trust This Device</label>
              </div>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?{' '}
            <Link
              className="no-underline border-b border-green text-blue"
              to="/register"
            >
              Sign Up
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
