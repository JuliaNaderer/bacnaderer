import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { MoodBad, Mood, SentimentDissatisfied, SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@mui/icons-material';
import '../App.css'; // Make sure to import your CSS file

export const Feedback = () => {
  const [overallRating, setOverallRating] = useState(0); // Initially no rating
  const [uiDesignFeedback, setUiDesignFeedback] = useState('');
  const [usabilityFeedback, setUsabilityFeedback] = useState('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');

  const handleRatingChange = (rating) => {
    setOverallRating(rating);
  };

  const handleSubmitFeedback = () => {
    // Logic to submit feedback
    console.log('Overall Rating:', overallRating);
    console.log('UI Design Feedback:', uiDesignFeedback);
    console.log('Usability Feedback:', usabilityFeedback);
    console.log('Additional Feedback:', additionalFeedback);
    // Clearing state after submission
    setOverallRating(0);
    setUiDesignFeedback('');
    setUsabilityFeedback('');
    setAdditionalFeedback('');
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-header">We'd love to hear from you!</h2>
      <div className="rating-section">
        <h3>Overall Happiness Rating</h3>
        <div className="smiley-rating">
          <MoodBad onClick={() => handleRatingChange(1)} className={overallRating >= 1 ? 'selected' : ''} />
          <SentimentDissatisfied onClick={() => handleRatingChange(2)} className={overallRating >= 2 ? 'selected' : ''} />
          <SentimentSatisfied onClick={() => handleRatingChange(3)} className={overallRating >= 3 ? 'selected' : ''} />
          <SentimentSatisfied onClick={() => handleRatingChange(4)} className={overallRating >= 4 ? 'selected' : ''} />
          <SentimentVerySatisfied onClick={() => handleRatingChange(5)} className={overallRating >= 5 ? 'selected' : ''} />
        </div>
      </div>
      <div className="feedback-section">
        <h3>UI Design Feedback</h3>
        <TextField
          id="ui-design-feedback"
          className="feedback-textarea"
          multiline
          rows={4}
          variant="outlined"
          value={uiDesignFeedback}
          onChange={(e) => setUiDesignFeedback(e.target.value)}
          placeholder="Your feedback on UI design..."
        />
      </div>
      <div className="feedback-section">
        <h3>Usability Feedback</h3>
        <TextField
          id="usability-feedback"
          className="feedback-textarea"
          multiline
          rows={4}
          variant="outlined"
          value={usabilityFeedback}
          onChange={(e) => setUsabilityFeedback(e.target.value)}
          placeholder="Your feedback on usability..."
        />
      </div>
      <div className="feedback-section">
        <h3>Additional Feedback</h3>
        <TextField
          id="additional-feedback"
          className="feedback-textarea"
          multiline
          rows={4}
          variant="outlined"
          value={additionalFeedback}
          onChange={(e) => setAdditionalFeedback(e.target.value)}
          placeholder="Any additional feedback..."
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitFeedback}
      >
        Submit Feedback
      </Button>
    </div>
  );
};