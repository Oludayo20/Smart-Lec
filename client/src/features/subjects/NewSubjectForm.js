import { useAddNewSubjectMutation } from './subjectsApiSlice';
import { useNavigate } from 'react-router-dom';
import {
  faCheck,
  faInfoCircle,
  faSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const ADM_REGEX = /^[A-z][A-z0-9]{3,23}$/;

const NewStudentForm = ({ clsId }) => {
  const [addNewSubject, { data, isLoading, isSuccess, isError, error }] =
    useAddNewSubjectMutation();

  const navigate = useNavigate();

  const admRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const [subjectName, setSubjectName] = useState('');
  const [validSubjectName, setValidSubjectName] = useState(false);

  const [notePdf, setNotePdf] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    setValidSubjectName(USER_REGEX.test(subjectName));
  }, [subjectName]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setIsOpen(!isOpen);
      setNotePdf('');
      setNote('');
      setSubjectName('');
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, navigate, isError]);

  const canSave =
    [notePdf, note, validSubjectName, clsId].every(Boolean) && !isLoading;

  const onSaveStudent = async (e) => {
    e.preventDefault();
    if (canSave) {
      console.log({
        subjectName,
        notePdf,
        note,
        clsId
      });
      await addNewSubject({
        note,
        notePdf,
        subjectName,
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
        Create Subject
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
                Create a Subject
              </h2>

              <form onSubmit={onSaveStudent}>
                {/* Admission Number */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    Subject Name:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={validSubjectName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validSubjectName || !subjectName ? 'hide' : 'invalid'
                    }
                  /> */}
                  </label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    ref={admRef}
                    name="Subject"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    aria-invalid={validSubjectName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                  />
                  {/* <p
                  id="uidnote"
                  className={
                    notePdf && !validSubjectName
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

                {/* Note Pdf */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    Note Pdf:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !notePdf ? 'hide' : 'invalid'}
                  /> */}
                  </label>
                  <input
                    type="file"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="Note Pdf"
                    placeholder="Note Pdf"
                    id="pdf"
                    accept=".pdf"
                    onChange={(e) => setNotePdf(e.target.files[0])}
                    aria-describedby="uidnote"
                  />
                  {/* <p
                  id="uidnote"
                  className={
                    notePdf && !validName ? 'instructions' : 'offscreen'
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

                {/* Note */}
                <div className="flex flex-col">
                  <label htmlFor="text-input" className="text-lg font-bold">
                    Note:
                    {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={note && validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={note && validName ? 'hide' : 'invalid'}
                  /> */}
                  </label>
                  <textarea
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="note"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    aria-describedby="uidnote"
                  />

                  {/* <p
                  id="uidnote"
                  className={
                    notePdf && !validName ? 'instructions' : 'offscreen'
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
                    Save Subject
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
