import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { register, reset, status } from './authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';
import './LogReg.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const nameRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [ValidFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [surname, setSurname] = useState('');
  const [ValidSurname, setValidSurname] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(status);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidSurname(USER_REGEX.test(surname));
  }, [surname]);

  useEffect(() => {
    setValidEmail(email);
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if (isSuccess) {
      setSuccess(true);
    }

    dispatch(reset());
  }, [isError, isSuccess, setSuccess, message, navigate, dispatch, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(firstName);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      toast.error('Password does not match');
      return;
    } else {
      const userData = {
        firstName,
        surname,
        email,
        password: pwd
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="App">
        {success ? (
          <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">
                  Welcome {firstName}
                </h1>
                <h3>Your account have created Successfully!</h3>
                <p>
                  <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // <!-- component -->
          <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <form onSubmit={handleSubmit}>
                  {/* First Name */}
                  <label htmlFor="firstName">
                    First-name:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={ValidFirstName ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        ValidFirstName || !firstName ? 'hide' : 'invalid'
                      }
                    />
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    ref={nameRef}
                    name="first name"
                    placeholder="First-name"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-invalid={ValidFirstName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      firstNameFocus && firstName && !ValidFirstName
                        ? 'instructions'
                        : 'offscreen'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  {/* Surname */}
                  <label htmlFor="firstName">
                    Surname:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={ValidSurname ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={ValidSurname || !surname ? 'hide' : 'invalid'}
                    />
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="Surname"
                    placeholder="Surname"
                    autoComplete="off"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    required
                    aria-invalid={ValidFirstName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setSurnameFocus(true)}
                    onBlur={() => setSurnameFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      surnameFocus && surname && !ValidSurname
                        ? 'instructions'
                        : 'offscreen'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  {/* Email */}

                  <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validEmail ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validEmail || !email ? 'hide' : 'invalid'}
                    />
                  </label>

                  <input
                    type="email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      emailFocus && email && !validEmail
                        ? 'instructions'
                        : 'offscreen'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                  <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validPwd || !pwd ? 'hide' : 'invalid'}
                    />
                  </label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{' '}
                    <span aria-label="exclamation mark">!</span>{' '}
                    <span aria-label="at symbol">@</span>{' '}
                    <span aria-label="hashtag">#</span>{' '}
                    <span aria-label="dollar sign">$</span>{' '}
                    <span aria-label="percent">%</span>
                  </p>
                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPwd ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                    />
                  </label>
                  <input
                    type="password"
                    required
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? 'instructions' : 'offscreen'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>

                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                    disabled={
                      isLoading ||
                      !ValidFirstName ||
                      !ValidSurname ||
                      !validPwd ||
                      !validMatch
                        ? true
                        : false
                    }
                  >
                    Create Account
                  </button>
                </form>
                <div className="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the{' '}
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    Terms of Service
                  </a>{' '}
                  and
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    {' '}
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div className="text-grey-dark mt-6">
                Already have an account?{' '}
                <Link
                  className="no-underline border-b border-green text-blue"
                  to="/login"
                >
                  Log in
                </Link>
                .
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
