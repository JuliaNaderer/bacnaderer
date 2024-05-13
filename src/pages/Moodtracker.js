import React from 'react';
import Mood from '../components/Mood';

const MoodTrackPage = () => {
    console.log("rendered moodtrackpage")
  return (
    <div>
      <h1>Mood Tracker</h1>
      <Mood />
    </div>
  );
};

export default MoodTrackPage;
