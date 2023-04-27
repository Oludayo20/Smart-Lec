import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../../hooks/usePersist';
import { toast } from 'react-toastify';

const Login = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState('');

  const [pwd, setPwd] = useState('');

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pwd) return toast.error('Please input email and password');
    try {
      const { accessToken } = await login({ email, password: pwd }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail('');
      setPwd('');
      navigate('/dash');
      toast.success(`Welcome Back ${email}`);
    } catch (err) {
      if (!err.status) {
        toast.error('No Server Response');
      } else if (err.status === 400) {
        toast.error('Missing Username or Password');
      } else if (err.status === 401) {
        toast.error('Unauthorized');
      } else {
        toast.error(err.data?.message);
      }
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <section className="public">
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
                  onChange={handleToggle}
                  checked={persist}
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
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};
export default Login;
