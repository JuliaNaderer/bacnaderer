import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

export const Mood = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const emojis = ['😄', '😊', '😐', '😔', '😢', '😡', '😱', '😴'];

  const handleMoodSelection = (index) => {
    setSelectedMood(index);
    setMoodHistory([...moodHistory, index]);
  };

  const moodData = {
    labels: moodHistory.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Mood',
        data: moodHistory,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
    <div className='mood'>
      <h3 className='moodHeadline'>Select your current mood:</h3>
      <div className='moodemojis'>
        {emojis.map((emoji, index) => (
          <span
          key={index}
          style={{ fontSize: '1em', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => handleMoodSelection(index)}
          role="button"
          tabIndex={0}
        >
          {emoji}
        </span>
        
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Mood History:</h2>
        {/*<Line data={moodData} />*/}
      </div>
    </div>
    </div>
  );
};
