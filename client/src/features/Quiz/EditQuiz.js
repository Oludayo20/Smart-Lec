import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { createQuiz, status, reset } from './quizSlice';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import { Alert, CircularProgress } from '@mui/material';
import Spinner from '../../utils/Spinner';
import { toast } from 'react-toastify';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

function QuizForm() {
  const desRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');

  const { isLoading, isSuccess, message, isError } = useSelector(status);

  const userData = useAuth();

  useEffect(() => {
    desRef.current.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate('/quiz/quizzes');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, reset]);

  const saveQuestions = () => {
    console.log(questions);
    if (!description || !title || !questions || !userData) {
      toast.error('All fields are required');
    } else {
      var quizData = {
        title: title,
        description: description,
        questions: questions,
        createdBy: userData.userId
      };

      dispatch(createQuiz(quizData));
    }
  };

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions((questions) => [
      ...questions,
      {
        questionText: 'Question',
        options: [{ optionText: 'Option 1' }],
        answer: '',
        open: true
      }
    ]);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach((opn) => {
      var opn1new = {
        optionText: opn.optionText
      };
      myNewOptions.push(opn1new);
    });
    var newQuestion = {
      questionText: qs[i].questionText,
      options: myNewOptions,
      answer: qs[i].answer,
      open: true
    };
    setQuestions((questions) => [...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function handleOptionValue(text, i, j) {
    // console.log(text);
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    setQuestions(optionsOfQuestion);
  }

  const handleAnswer = (text, i) => {
    setAnswer(text);
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = text;
    setQuestions(answerOfQuestion);
  };

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function showAsQuestion(i) {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: 'Option ' + (optionsOfQuestion[i].options.length + 1)
      });
    } else {
      console.log('Max  5 options ');
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + '__' + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  if (isLoading) {
    return <Spinner />;
  }

  let content = questions.map((ques, i) => (
    <div key={i}>
      <div>
        <div style={{ marginBottom: '15px' }} key={i}>
          <div style={{ width: '100%', marginBottom: '-7px' }}></div>

          <Accordion
            onChange={() => {
              handleExpand(i);
            }}
            expanded={questions[i].open}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1}
              style={{ width: '100%' }}
            >
              {!questions[i].open ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginLeft: '3px',
                    paddingTop: '15px',
                    paddingBottom: '15px'
                  }}
                >
                  <TextField
                    id="standard-basic"
                    value="Question"
                    InputProps={{ disableUnderline: true }}
                  />

                  <Typography
                    variant="subtitle1"
                    style={{ marginLeft: '0px', fontWeight: 'bold' }}
                  >
                    {i + 1}. {ques.questionText}
                  </Typography>

                  {ques.options.map((op, j) => (
                    <div key={j}>
                      <div style={{ display: 'flex', fontWeight: 'bold' }}>
                        <FormControlLabel
                          disabled
                          control={
                            <Radio
                              style={{ marginRight: '3px', color: '#22c55e' }}
                            />
                          }
                          label={
                            <Typography style={{ color: 'black' }}>
                              {ques.options[j].optionText}
                            </Typography>
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </AccordionSummary>

            <AccordionDetails>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: '15px',
                  marginTop: '-15px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography style={{ marginLeft: '0px', fontWeight: 'bold' }}>
                    {i + 1}.
                  </Typography>
                  <TextField
                    variant="filled"
                    fullWidth={true}
                    InputProps={{
                      style: {
                        fontSize: 20,
                        color: 'black'
                      }
                    }}
                    id="filled-hidden-label-small"
                    label="Question:"
                    style={{ marginBottom: '18px' }}
                    multiline={true}
                    // value={ques.questionText}
                    onChange={(e) => {
                      handleQuestionValue(e.target.value, i);
                    }}
                  />
                  <IconButton aria-label="upload image">
                    <CropOriginalIcon style={{ color: '#22c55e' }} />
                  </IconButton>
                </div>

                {/* Options */}
                <div style={{ width: '100%' }}>
                  {ques.options.map((op, j) => (
                    <div key={j}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginLeft: '-12.5px',
                          justifyContent: 'space-between',
                          paddingTop: '5px',
                          paddingBottom: '5px'
                        }}
                      >
                        <Radio disabled style={{ color: '#22c55e' }} />

                        <TextField
                          fullWidth={true}
                          InputProps={{
                            style: {
                              fontSize: 18,
                              color: 'black'
                            }
                          }}
                          id="filled-hidden-label-small"
                          label={`Option ${j}:`}
                          multiline={true}
                          onChange={(e) => {
                            handleOptionValue(e.target.value, i, j);
                          }}
                          // value={ques.options[j].optionText}
                        />
                        <IconButton aria-label="upload image">
                          <CropOriginalIcon style={{ color: '#22c55e' }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            removeOption(i, j);
                          }}
                        >
                          <CloseIcon style={{ color: '#22c55e' }} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Add button */}
                {ques.options.length < 5 ? (
                  <div>
                    <FormControlLabel
                      disabled
                      control={<Radio style={{ color: '#22c55e' }} />}
                      label={
                        <Button
                          size="small"
                          onClick={() => {
                            addOption(i);
                          }}
                          style={{
                            textTransform: 'none',
                            marginLeft: '-5px'
                          }}
                        >
                          Add Option
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  ''
                )}

                <br></br>

                <Typography variant="body2" style={{ color: 'black' }}>
                  You can add maximum 5 options. If you want to add more then
                  change in settings. Multiple choice single option is availible
                </Typography>
              </div>
            </AccordionDetails>

            <Divider />

            <AccordionActions>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{
                    maxWidth: 200,
                    minWidth: 100
                  }}
                  value={answer}
                  label="Answer:"
                  onChange={(e) => {
                    handleAnswer(e.target.value, i);
                  }}
                >
                  <MenuItem value={'Option 0'}>Option 0</MenuItem>
                  <MenuItem value={'Option 1'}>Option 1</MenuItem>
                  <MenuItem value={'Option 2'}>Option 2</MenuItem>
                  <MenuItem value={'Option 3'}>Option 3</MenuItem>
                  <MenuItem value={'Option 4'}>Option 4</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                aria-label="View"
                onClick={() => {
                  showAsQuestion(i);
                }}
              >
                <VisibilityIcon style={{ color: '#22c55e' }} />
              </IconButton>

              <IconButton
                aria-label="Copy"
                onClick={() => {
                  copyQuestion(i);
                }}
              >
                <FilterNoneIcon style={{ color: '#22c55e' }} />
              </IconButton>
              <Divider orientation="vertical" flexItem />

              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteQuestion(i);
                }}
              >
                <DeleteOutlineIcon style={{ color: '#22c55e' }} />
              </IconButton>

              <IconButton aria-label="Image">
                <MoreVertIcon style={{ color: '#22c55e' }} />
              </IconButton>
            </AccordionActions>
          </Accordion>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="p-4 col-span-full xl:col-span-8 bg-slate-300 shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Create Your Own Quiz Here:
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <Grid className="p-t-5 grid grid-cols gap-4">
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
                              alignItems: 'flex-start',
                              marginLeft: '15px',
                              paddingTop: '20px',
                              paddingBottom: '20px'
                            }}
                          >
                            <TextField
                              inputRef={desRef}
                              fullWidth={true}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  fontSize: 30,
                                  color: 'black',
                                  fontFamily: 'serif',
                                  fontWeight: '700'
                                }
                              }}
                              id="filled-hidden-label-small"
                              label="Title:"
                              multiline={true}
                              onChange={(e) => setTitle(e.target.value)}
                            />

                            <TextField
                              fullWidth={true}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  fontSize: 20,
                                  color: 'black',
                                  fontWeight: '500'
                                }
                              }}
                              id="filled-hidden-label-small"
                              label="Description:"
                              style={{ marginBottom: '18px' }}
                              multiline={true}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </Paper>
                      </div>
                    </div>
                  </Grid>

                  <Grid style={{ paddingTop: '15px' }}>
                    <div>
                      {content}
                      <div className="flex justify-center space-x-20">
                        <Button
                          className="font-bold py-2 px-4 rounded-l"
                          variant="contained"
                          onClick={addMoreQuestionField}
                          endIcon={<AddCircleIcon />}
                          style={{
                            backgroundColor: '#22c55e',
                            color: '#fff'
                          }}
                        >
                          Add Question{' '}
                        </Button>

                        <Button
                          disabled={
                            !description || !title || !questions || !userData
                              ? true
                              : false
                          }
                          className=" font-bold py-2 px-4 rounded-l"
                          variant="contained"
                          onClick={saveQuestions}
                          style={{
                            backgroundColor: '#22c55e',
                            color: '#fff'
                          }}
                          endIcon={<SaveIcon />}
                        >
                          Save Questions{' '}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default QuizForm;
