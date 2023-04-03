import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Radio from '@material-ui/core/Radio';
import { Switch } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { deleteQuiz, status, reset } from './quizSlice';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';
import Cards from '../../components/cards/Cards';

import EditMenu from '../../components/EditMenu';

export function Summary(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/notes/${props.id}`);

  return (
    <div className="">
      <header className="flex justify-between items-start mb-2">
        {/* Lnk */}
        <h2 className="text-lg font-semibold text-slate-800">0 Response</h2>
        {/* Menu button */}
        <EditMenu className="relative inline-flex">
          <li>
            <button
              onClick={handleEdit}
              className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
              to="#0"
            >
              Edit Quiz
            </button>
          </li>
          <li>
            <Link
              className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
              to="#0"
            >
              Copy Quiz
            </Link>
          </li>
          <li>
            <button
              className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
              to="#0"
            >
              Delete Quiz
            </button>
          </li>
        </EditMenu>
      </header>

      <div className="text-xs6 text-right text-slate-500 bg-slate-200 rounded-sm font-semibold p-2">
        Accepting response
        <Switch defaultChecked color="default" />
      </div>
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        {props.title}
      </h2>

      <h4 className="text-lg2 font-semibold text-slate-800 mb-2">
        {props.desc}
      </h4>
    </div>
  );
}

export function Question(props) {
  const question = props.question;
  console.log(question);

  const [showMore, setShowMore] = useState(false);
  const limit = 1; // number of items to show initially

  const handleShowMore = () => {
    setShowMore(true);
  };
  const handleShowLess = () => {
    setShowMore(false);
  };

  return (
    <div>
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-slate-800 border-b-4 border-green-500">
          {props.title}
        </h2>
        {/* Menu button */}
        <EditMenu className="relative inline-flex">
          <li>
            <Link
              className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
              to="#0"
            >
              Edit Quiz
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
              to="#0"
            >
              Copy Quiz
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
              to="#0"
            >
              Delete Quiz
            </Link>
          </li>
        </EditMenu>
      </header>
      {question
        .slice(0, showMore ? question.length : limit)
        .map((ques, index) => (
          <>
            <div className="mb-4" key={ques._id}>
              <div className="flex inline mb-2">
                <h1 className="text-lg font-bold text-slate-800 mb-2">
                  {`${index + 1}.`}
                </h1>
                <h1 className="text-lg ml-4 font-semibold text-slate-800 mb-2">
                  {ques.questionText}
                </h1>
              </div>
              <div>
                {ques.options.map((opt, index) => (
                  <div className="flex inline" key={opt._id}>
                    <Radio style={{ color: '#22c55e' }} />
                    <h1 className="text-lg pt-2 ml-4 font-semibold text-slate-800">
                      {opt.optionText}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </>
        ))}
      <div className="text-xs6 text-right text-slate-800">
        {!showMore ? (
          <button
            className="italic border-b-2 border-green-500"
            onClick={handleShowMore}
          >
            {' '}
            show more
          </button>
        ) : (
          <button
            className="italic border-b-2 border-green-500"
            onClick={handleShowLess}
          >
            {' '}
            show less
          </button>
        )}
      </div>
    </div>
  );
}

export function Response() {}

export default { Summary, Question, Response };
