import { useState, useEffect, useRef } from 'react';
import { useAddNewClsMutation } from './clsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faInfoCircle,
  faSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';

const CLS_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;

const NewClsForm = ({ users }) => {
  const [addNewCls, { data, isLoading, isSuccess, isError, error }] =
    useAddNewClsMutation();

  const clsNameRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [clsName, setClsName] = useState('');
  const [validClsName, setValidClsName] = useState(false);

  useEffect(() => {
    setValidClsName(CLS_REGEX.test(clsName));
  }, [clsName]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setIsOpen(!isOpen);
      setClsName('');
      setSelectedTeacher('');
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, toast, setIsOpen, isError, error]);

  const canSave = [clsName].every(Boolean) && !isLoading;

  const onSaveCls = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewCls({ clsName, teacherId: selectedTeacher });
    }
  };

  // console.log(users);
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

  if (isLoading) {
    return <PulseLoader color={'#09cb23'} />;
  }

  const content = (
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
          {/* <form onSubmit={onSaveNoteClicked}> */}
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
                    Select a teacher
                  </option>
                  {options}
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

export default NewClsForm;
