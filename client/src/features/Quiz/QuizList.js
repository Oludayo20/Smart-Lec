import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { status } from './quizSlice';

import Spinner from '../../utils/Spinner';
import Cards from '../../components/cards/Cards';
import { Question, Summary } from './QuizCard';
import { toast } from 'react-toastify';

function QuizList() {
  const userData = useAuth();
  const { quizzes } = userData;

  const [currentPage, setCurrentPage] = useState('summary');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const { quiz } = useSelector(status);

  console.log(quizzes);

  const navigate = useNavigate();

  useEffect(() => {}, [quizzes, toast, navigate]);

  if (!quizzes) {
    toast.warn('Something happened, Please login again');
    navigate('/login');
  }

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <Cards />
      </div>
      {/* Recent Quiz */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="p-4 col-span-full xl:col-span-8 bg-slate-300 shadow-lg rounded-sm border border-slate-200">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            Recent Quiz
          </header>

          <div className="p-3">
            {quiz ? (
              <div className="overflow-x-auto" key={quiz._id}>
                <Grid className="p-2 grid grid-cols gap-4">
                  <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <Grid
                      style={{
                        borderTop: '10px solid #22c55e',
                        borderRadius: 10
                      }}
                    >
                      <div>
                        <div>
                          <Paper elevation={2} style={{ width: '100%' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '10px 8px 20px 8px'
                              }}
                            >
                              {currentPage === 'summary' && (
                                <Summary
                                  id={quiz._id}
                                  title={quiz.title}
                                  desc={quiz.description}
                                />
                              )}
                              {currentPage === 'question' && (
                                <Question
                                  id={quiz._id}
                                  title={quiz.title}
                                  question={quiz.questions}
                                />
                              )}
                            </div>
                            <nav>
                              <div className="flex justify-between px-6">
                                <button
                                  onClick={() => handleNavigation('summary')}
                                  type="submit"
                                  className={`text-center focus:outline-none my-1 ${
                                    currentPage === 'summary' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Summary
                                </button>
                                <button
                                  onClick={() => handleNavigation('question')}
                                  type="submit"
                                  className={`text-center  my-1 ${
                                    currentPage === 'question' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Question ({quiz.questions.length})
                                </button>
                                <button
                                  onClick={() => handleNavigation('response')}
                                  type="submit"
                                  className={`text-center focus:outline-none my-1 ${
                                    currentPage === 'response' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Response
                                </button>
                              </div>
                            </nav>
                          </Paper>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <h1 className="text-center">No recent Quiz</h1>
            )}
          </div>
          <div className="flex justify-center space-x-20">
            <Link to="quizForm">
              <Button
                className="font-bold py-2 px-4 rounded-l"
                variant="contained"
                endIcon={<AddCircleIcon />}
                style={{
                  backgroundColor: '#22c55e',
                  color: '#fff'
                }}
              >
                Create Quiz{' '}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Quiz */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="p-4 col-span-full xl:col-span-8 bg-slate-300 shadow-lg rounded-sm border border-slate-200">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            Other Quiz
          </header>

          <div className="p-3">
            {quizzes.map((quiz) => (
              <div className="overflow-x-auto" key={quiz._id}>
                <Grid className="p-2 grid grid-cols gap-4">
                  <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <Grid
                      style={{
                        borderTop: '10px solid #22c55e',
                        borderRadius: 10
                      }}
                    >
                      <div>
                        <div>
                          <Paper elevation={2} style={{ width: '100%' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '10px 8px 20px 8px'
                              }}
                            >
                              {currentPage === 'summary' && (
                                <Summary
                                  id={quiz._id}
                                  title={quiz.title}
                                  desc={quiz.description}
                                />
                              )}
                              {currentPage === 'question' && (
                                <Question
                                  id={quiz._id}
                                  title={quiz.title}
                                  question={quiz.questions}
                                />
                              )}
                            </div>
                            <nav>
                              <div className="flex justify-between px-6">
                                <button
                                  onClick={() => handleNavigation('summary')}
                                  type="submit"
                                  className={`text-center focus:outline-none my-1 ${
                                    currentPage === 'summary' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Summary
                                </button>
                                <button
                                  onClick={() => handleNavigation('question')}
                                  type="submit"
                                  className={`text-center  my-1 ${
                                    currentPage === 'question' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Question ({quiz.questions.length})
                                </button>
                                <button
                                  onClick={() => handleNavigation('response')}
                                  type="submit"
                                  className={`text-center focus:outline-none my-1 ${
                                    currentPage === 'response' &&
                                    'border-b-3 border-green-500'
                                  } 
                                  `}
                                >
                                  Response
                                </button>
                              </div>
                            </nav>
                          </Paper>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default QuizList;
