import { useAddNewStudentMutation } from './studentApiSlice';
import { useNavigate } from 'react-router-dom';
import {
  faCheck,
  faInfoCircle,
  faSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState } from 'react';
import { ROLES } from '../../config/roles';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const ADM_REGEX = /^[A-z][A-z0-9]{3,23}$/;

const NewStudentForm = ({ clsId }) => {
  const [addNewUser, { data, isLoading, isSuccess, isError, error }] =
    useAddNewStudentMutation();

  const navigate = useNavigate();

  const admRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const [admissionNum, setAdmissionNum] = useState('');
  const [validAdmissionNum, setValidAdmissionNum] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [validName, setValidName] = useState(false);

  useEffect(() => {
    setValidAdmissionNum(ADM_REGEX.test(admissionNum));
  }, [admissionNum]);

  useEffect(() => {
    setValidName(USER_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setIsOpen(!isOpen);
      setFirstName('');
      setSurname('');
      setAdmissionNum('');
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, navigate, isError]);

  const canSave =
    [validName, surname, validAdmissionNum, clsId].every(Boolean) && !isLoading;

  const onSaveStudent = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({
        admissionNum,
        firstName,
        surname,
        clsId
      });
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <PulseLoader color={'#09cb23'} />;
  }

  const content = (
    <div className="relative">
      <button
        className={`p-2 w-full text-center text-white py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none ${
          isOpen && 'bg-green-500'
        }`}
        onClick={handleButtonClick}
      >
        Create Student
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleButtonClick}
            ></div>
            <div className="w-5/6 bg-white rounded-lg p-8 z-10">
              <h2 className="text-2xl font-bold mb-4 text-xs6 text-center text-slate-800 italic border-b-2 border-green-500">
                Create a Student
              </h2>

              <form onSubmit={onSaveStudent}>
                {/* Admission Number */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    Admission Number:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={validAdmissionNum ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validAdmissionNum || !admissionNum ? 'hide' : 'invalid'
                    }
                  /> */}
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    ref={admRef}
                    name="class"
                    placeholder="Admission Number"
                    value={admissionNum}
                    onChange={(e) => setAdmissionNum(e.target.value)}
                    aria-invalid={validAdmissionNum ? 'false' : 'true'}
                    aria-describedby="uidnote"
                  />
                  {/* <p
                  id="uidnote"
                  className={
                    firstName && !validAdmissionNum
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
                </p> */}
                </div>

                {/* First Name */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    First Name:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !firstName ? 'hide' : 'invalid'}
                  /> */}
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="class"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                  />
                  {/* <p
                  id="uidnote"
                  className={
                    firstName && !validName ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p> */}
                </div>

                {/* Surname */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    Surname:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={surname && validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={surname && validName ? 'hide' : 'invalid'}
                  /> */}
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="class"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                  />
                  {/* <p
                  id="uidnote"
                  className={
                    firstName && !validName ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p> */}
                </div>

                <div className="flex space-x-4">
                  <button
                    className="w-full text-center text-white py-3 rounded bg-red-500 hover:bg-green-600 focus:outline-none my-1"
                    onClick={handleButtonClick}
                  >
                    Close
                  </button>
                  <button
                    disabled={!canSave}
                    title="Save"
                    // onClick={onSaveStudent}
                    className="w-full text-center text-white py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                  >
                    Save Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return content;
};
export default NewStudentForm;
