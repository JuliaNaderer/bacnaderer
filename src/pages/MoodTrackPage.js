import React from 'react';
import { Mood } from '../components/Mood';
import AppBar from "./AppBar";

export const MoodTrackPage = () => {
  return (
    <div className="App" id="outer-container">
      <AppBar />
      <Mood />
    </div>
  );
};
