import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserSurveys } from '../firebase';
import '../App.css';

export const Survey = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState([]);
  const [surveys, setSurveys] = useState([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
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
      {isLoading ? <p>Appointments are Loading...</p> :
        <div>
          {surveys.map((surveyInstance, index) => (
            <div key={index} className={`survey ${expanded ? 'expanded' : ''}`}>
              <div className="survey-title" onClick={toggleExpand}>
                <h3>{surveyInstance.title} | Status: {surveyInstance.status}</h3>
                <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="expand-icon" />
              </div>
              <br />
              <div className="survey-content">
                {expanded && surveyInstance.questions.map((question, index) => (
                  <div>
                    <div key={index} className="survey-question">
                      <h4 htmlFor={`question-${index}`}>{question}</h4>
                      <textarea
                        className="surveyTextarea"
                        placeholder="Your Answer goes here..."
                      />
                      <br/>
                      <br></br>
                      <button className="homeButton">Sumbit Question</button>
                      <br></br>
                      <br></br>
                    </div>
                    <br></br>
                  </div>
                ))}
                <br />
                <button className="homeButton">Sumbit Whole Survey</button>
              </div>
            </div>
          ))}
        </div>}
      <br />
      <br />
    </div>
  );
};
