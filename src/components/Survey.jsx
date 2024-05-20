import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserSurveys, submitAnswer, submitSurvey, updateStatus } from '../firebase'; // Assuming submitAnswer and submitSurvey are defined in firebase.js
import '../App.css';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import PollIcon from '@mui/icons-material/Poll';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Survey = () => {
  const [expanded, setExpanded] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isNotRotated, setNotRotated] = useState(false);

  const toggleExpand = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAnswerChange = (surveyIndex, questionIndex, value) => {
    setAnswers((prevState) => ({
      ...prevState,
      [surveyIndex]: {
        ...prevState[surveyIndex],
        [questionIndex]: value,
      },
    }));
  };

  const handleSubmitAnswer = async (surveyId, questionIndex) => {
    const answer = answers[surveyId]?.[questionIndex] || '';
    const answerStatusElements = document.getElementsByClassName(`answer-status ${surveyId} ${questionIndex}`);
    
    if (answer.trim()) {
      try {
        await submitAnswer(surveyId, questionIndex, answer);
        console.log('Answer submitted successfully.');
        
        // Update answer status for each element found
        Array.from(answerStatusElements).forEach(element => {
          element.innerText = 'Answer Received - Reload Page to see the new answer!';
        });
      } catch (error) {
        console.error('Error submitting answer:', error);
        Array.from(answerStatusElements).forEach(element => {
          element.innerText = 'Answer Not Received';
        });
      }
    }
  };
  
  const handleSubmitSurvey = async (surveyId) => {
    const surveyAnswers = answers[surveyId] || {};
    const surveyStatusElements = document.getElementsByClassName(`survey-status ${surveyId}`);

    // Check if there are any unanswered questions
    const unansweredQuestions = Object.values(surveyAnswers).some(answer => answer === null || answer === '');
    if (!unansweredQuestions) {
      try {
        // Update the status of the survey to "Done"
        await updateStatus(surveyId);
  
        // Submit the survey with answers
        await submitSurvey(surveyId, surveyAnswers);
        Array.from(surveyStatusElements).forEach(element => {
          element.innerText = 'Survey Received - Reload Page to see the updated Survey!';
        });
        console.log('Survey submitted successfully.');
      } catch (error) {
        console.error('Error submitting survey:', error);
        Array.from(surveyStatusElements).forEach(element => {
          element.innerText = 'Survey NOT Received - An error occured!';
        });
      }
    } else {
      console.log('Please answer all questions before submitting the survey.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const userSurveys = await getUserSurveys();
          setSurveys(userSurveys);
        } catch (error) {
          console.error('Error fetching surveys:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSurveys([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => { 
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerHeight > window.innerWidth){
      setNotRotated(true);
    }else{
      setNotRotated(false);
    }
    }, []);

  return (
    <div>
      <div>

      </div>
      { isNotRotated == true ? <div>
      <ScreenRotationIcon/>
      <h4>For a better experience please rotate your mobile device & reload the page! </h4></div> : null}
      {isLoading ? (
        <div>
          <Box>
            <CircularProgress />
         </Box>
        <p>Surveys are loading...</p>
        </div>
      ) : (
        <div>
          {surveys.map((surveyInstance, index) => (
            <div key={index}>
              <div
                className={`survey ${expanded[index] ? 'expanded' : ''}`}
              >
                <div className="survey-title" onClick={() => toggleExpand(index)}>
                  <PollIcon className='pollicon'></PollIcon>
                  <h3>{surveyInstance.title} | Status: {surveyInstance.status}</h3>
                  <FontAwesomeIcon
                    icon={expanded[index] ? faChevronUp : faChevronDown}
                    className="expand-icon"
                  />
                </div>
                <div className="survey-content">
                  <div>
                  {expanded[index] &&
                    surveyInstance.questions.map((question, qIndex) => (
                      <div>
                      <div key={qIndex} className="survey-question">
                        <h4>{question}</h4>
                        <Textarea
                          className="surveyTextarea"
                          placeholder="Your Answer goes here..."
                          value={answers[surveyInstance.id]?.[qIndex] || ''}
                          onChange={(e) =>
                            handleAnswerChange(surveyInstance.id, qIndex, e.target.value)
                          }
                        />
                        <br></br>
                        <div className={"answer-status "+ surveyInstance.id + " " + qIndex}></div>
                        <br></br>
                        <button
                          className="homeButton"
                          onClick={() => handleSubmitAnswer(surveyInstance.id, qIndex)}
                        >
                          Submit Answer
                        </button>
                        <p className='answer'>
                           {surveyInstance.answers[qIndex] == null ? "[No Previous Answer Yet]" : "Previous Answer: " + surveyInstance.answers[qIndex]}
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                      <br></br>
                      </div>
                    ))}
                    <br></br>
                    </div>
                    <div className={"survey-status "+surveyInstance.id}></div>
                    <br></br>
                  <button
                    className="homeButton"
                    onClick={() => handleSubmitSurvey(surveyInstance.id)}
                  >
                    Submit Whole Survey
                  </button>
                </div>
                <br></br>
              </div>
              {index != surveys.length - 1 ? <div>--------------------------------------------------------
              </div> : null}
            </div>
          ))}
          <br></br>
          <br></br>

        </div>
      )}
    </div>
  );
};
