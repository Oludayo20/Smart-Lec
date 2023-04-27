import { useState, useEffect, useRef } from 'react';
import { useUpdateClsMutation, useDeleteClsMutation } from './clsApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';

const CLS_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;

const EditClsForm = ({ cls, users }) => {
  const { isAdmin, isTeacher } = useAuth();

  const [updateCls, { data, isLoading, isSuccess, isError, error }] =
    useUpdateClsMutation();

  const [
    deleteCls,
    {
      data: delData,
      isSuccess: isDelSuccess,
      isLoading: isDelLoading,
      isError: isDelError,
      error: delerror
    }
  ] = useDeleteClsMutation();

  const navigate = useNavigate();

  const clsNameRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [clsName, setClsName] = useState(cls.class_name);
  const [validClsName, setValidClsName] = useState(false);

  useEffect(() => {
    setValidClsName(CLS_REGEX.test(clsName));
  }, [clsName]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      toast.success(data?.message || delData?.message);
      setIsOpen(!isOpen);
      navigate('/dash/class');
    }
    if (isError || isDelError) {
      toast.error(error?.data?.message || delerror?.data?.message);
    }
  }, [isSuccess, isDelSuccess, isError, isDelError, toast, error, delerror]);

  const canSave = [clsName].every(Boolean) && !isLoading;

  const onSaveCls = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateCls({
        clsName,
        teacherId: selectedTeacher,
        clsId: cls.class_id
      });
    }
  };

  const onDeleteCls = async () => {
    console.log(cls.class_id);
    await deleteCls(cls.class_id);
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.first_name} {user.surname}
      </option>
    );
  });

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading || isDelLoading) {
    return <PulseLoader color={'#09cb23'} />;
  }

  const content = (
    <div className="relative">
      <button
        className={`w-full text-center text-green-800 rounded hover:bg-green-600 focus:outline-none ${
          isOpen && 'bg-green-500'
        }`}
        onClick={handleButtonClick}
      >
        Edit Class
      </button>
      {isOpen && (
        <>
          {/* <form onSubmit={onSaveCls}> */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleButtonClick}
            ></div>
            <div className="w-5/6 bg-white rounded-lg p-8 z-10">
              <h2 className="text-2xl font-bold mb-4 text-xs6 text-center text-slate-800 italic border-b-2 border-green-500">
                Edit Class
              </h2>

              <div className="flex flex-col">
                <label htmlFor="text-input" className="text-lg font-bold">
                  Class Name:
                  {/* <FontAwesomeIcon
                      icon={faCheck}
                      className={!validClsName ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validClsName || !clsName ? 'hide' : 'invalid'}
                    /> */}
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
                {/* <p
                    id="uidnote"
                    className={
                      !clsName && validClsName ? 'instructions' : 'offscreen'
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
                    {cls.teacher_name}
                  </option>
                  {options}
                </select>
                <h2 className="text-1.3xl mb-4 text-xs6 text-center text-slate-800 italic border-b-2 border-green-500">
                  This is a List of registered teacher in your school...
                </h2>
              </div>

              <div className="flex space-x-4">
                {isAdmin || isTeacher ? (
                  <button
                    className="w-full text-center text-white py-3 rounded bg-red-500 hover:bg-red-800 focus:outline-none my-1"
                    onClick={onDeleteCls}
                  >
                    Delete Class
                  </button>
                ) : (
                  ''
                )}

                <button
                  onClick={onSaveCls}
                  className="w-full text-center text-white py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                >
                  Save Class
                </button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </>
      )}
    </div>
  );

  return content;
};

export default EditClsForm;
