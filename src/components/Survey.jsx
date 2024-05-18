import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserSurveys } from '../firebase';
import '../App.css';

export const Survey = () => {
  const [expanded, setExpanded] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([]);

  const toggleExpand = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        // Benutzer ist angemeldet, hole seine Termine
        const userSurveys = await getUserSurveys(); // Call the function to get appointments from Firebase
        console.log(userSurveys);
        setSurveys(userSurveys);
        setLoading(false);
      } else {
        // Benutzer ist abgemeldet, leere die Termine
        setSurveys([]);
      }
    });
    // Aufräumen bei Unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Appointments are Loading...</p>
      ) : (
        <div>
          {surveys.map((surveyInstance, index) => (
            <div>
              <div
                key={index}
                className={`survey ${index} ${expanded[index] ? 'expanded' : ''}`}
              >
                <div className="survey-title" onClick={() => toggleExpand(index)}>
                  <h3>{surveyInstance.title} | Status: {surveyInstance.status}</h3>
                  <FontAwesomeIcon
                    icon={expanded[index] ? faChevronUp : faChevronDown}
                    className="expand-icon"
                  />
                </div>
                <br />
                <div className="survey-content">
                  {expanded[index] &&
                    surveyInstance.questions.map((question, qIndex) => (
                      <div>
                        <div key={qIndex} className="survey-question">
                          <h4 htmlFor={`question-${index}-${qIndex}`}>{question}</h4>
                          <Textarea
                            key={qIndex}
                            className="surveyTextarea"
                            placeholder="Your Answer goes here..."
                          />
                          <br />
                          <p className='answer'>
                            Previous Answer: {surveyInstance.answers[qIndex]}
                          </p>
                          <button className="homeButton">Submit Question</button>
                          <br />
                          <br />
                        </div>
                        <br />
                        <br />
                      </div>
                    ))}
                  <br />
                  <button className="homeButton">Submit Whole Survey</button>
                </div>
              </div>
              <br />
              <br />
            </div>
          ))}
        </div>
      )}
      <br />
      <br />
    </div>
  );
};
