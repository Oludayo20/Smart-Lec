import {
  faCheck,
  faInfoCircle,
  faSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCls, reset, status } from './clsSlice';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;

const CreateCls = () => {
  const clsNameRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [clsName, setClsName] = useState('');
  const [validClsName, setValidClsName] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.auth);

  const { isLoading, isSuccess, isError, message } = useSelector(status);

  useEffect(() => {
    setValidClsName(USER_REGEX.test(clsName));
  }, [clsName]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);

      setIsOpen(false);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, toast]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleCreateCls = () => {
    if (!clsName || !selectedTeacher) {
      return toast.error('Class name is required!!');
    } else {
      const clsData = { clsName, teacherId: selectedTeacher };
      dispatch(createCls(clsData));
    }
  };

  return (
    <div className="relative">
      <button
        className={`w-full text-center text-white py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1 ${
          isOpen && 'bg-green-500'
        }`}
        onClick={handleButtonClick}
      >
        Create Class
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
                Create a Class
              </h2>

              <div className="flex flex-col">
                <label htmlFor="text-input" className="text-lg font-bold">
                  Class Name:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validClsName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validClsName || !clsName ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  ref={clsNameRef}
                  name="class"
                  placeholder="Class Name"
                  value={clsName}
                  onChange={(e) => setClsName(e.target.value)}
                  aria-invalid={validClsName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                />
                <p
                  id="uidnote"
                  className={
                    clsName && !validClsName ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              {/* Teacher */}
              <div className="flex flex-col mb-4">
                <label htmlFor="select-option" className="text-lg font-bold">
                  Select Teacher:
                </label>
                <select
                  id="select-option"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option className="text-2xl hover:bg-green-600" value="">
                    Select a teacher
                  </option>
                  {teachers.map((teacher, index) => (
                    <option
                      className="text-2xl hover:bg-green-600"
                      key={index}
                      value={teacher.user_id}
                    >
                      {teacher.first_name} {teacher.surname}
                    </option>
                  ))}
                </select>
                <h2 className="text-1.3xl mb-4 text-xs6 text-center text-slate-800 italic border-b-2 border-green-500">
                  This is a List of registered teacher in your school...
                </h2>
              </div>

              <div className="flex space-x-4">
                <button
                  className="w-full text-center text-white py-3 rounded bg-red-500 hover:bg-green-600 focus:outline-none my-1"
                  onClick={handleButtonClick}
                >
                  Close
                </button>
                <button
                  onClick={handleCreateCls}
                  className="w-full text-center text-white py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                >
                  Save Class
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(CreateCls);
