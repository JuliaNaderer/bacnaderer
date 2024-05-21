// Importe am Anfang der Datei
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, doc, arrayUnion, serverTimestamp, setDoc, updateDoc, getDoc, collection, getDocs, where, query  } from 'firebase/firestore';
import { getMoodEntries, updateMoodEntry} from '../firebase';
import MoodChart from './MoodChart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const emojis = [
  { emoji: '😄', label: 'Excited', color: '#FFCE43' },
  { emoji: '😃', label: 'Happy', color: '#FFC1E7' },
  { emoji: '😞', label: 'Sad', color: '#3498DB' },
  { emoji: '😔', label: 'Dissapointed', color: '#9B59B6' },
  { emoji: '😌', label: 'Calm', color: '#90EE90' },
  { emoji: '😰', label: 'Anxious', color: '#E74C3C' }, 
  { emoji: '😒', label: 'Jealous', color: '#38D39F' },
  { emoji: '😀', label: 'Energetic', color: '#F859B7' },
  { emoji: '😍', label: 'Loved', color: '#FFE08C'},
  { emoji: '😊', label: 'Creative', color: '#FFE559' },
  { emoji: '😟', label: 'Lonely', color: '#A9D7D3' },
  { emoji: '😠', label: 'Irritated', color: '#EAC117 ' },
  { emoji: '😤', label: 'Frustrated', color: '#C62828' },
  { emoji: '😵', label: 'Lost', color: '#D670AF' },
  { emoji: '😴', label: 'Tired', color: '#474747' },
  { emoji: '😇', label: 'Grateful', color:'#9CCC65' },
];

const auth = getAuth();
const db = getFirestore();

export const Mood = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Speichern Sie den Benutzer im Zustand
        setIsLoading(true);
        const moodEntries = await getMoodEntries(user.uid); // Hier verwenden wir user.uid anstatt der uid Prop
        if (moodEntries) {
          setMoods(moodEntries);
        }
        setIsLoading(false);
      } else {
        console.error('Kein Benutzer ist angemeldet.');
      }
    });
  
    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleMoodSelection = async (index) => {
    if (!user) {
      console.error('Kein Benutzer ist angemeldet.');
      return;
    }
  
    // Access the first element with the class "mood-status"
    const moodStatusElement = document.getElementsByClassName("mood-status")[0];
    if (moodStatusElement) {
      moodStatusElement.innerHTML = "\"" + emojis[index].label + "\"" + " mood tracked";
    }
  
    const moodEntry = {
      mID: Date.now(), // Verwenden Sie die aktuelle Zeit in Millisekunden als mID
      mood: index + 1,
      date: new Date(),
      color: emojis[index].color, // Zugriff auf das Farbfeld mit einem Großbuchstaben "C"
    };
  
    if (moodEntries.length > 1) {
        updateMoodEntry(moodEntry);
        setMoodEntries(prevMoodEntries => [...prevMoodEntries, moodEntry]);
        console.log('Mood saved!');
      } else {
      await setDoc(doc(db, "moods", Math.random().toString(16).slice(2)), {
        uid: user.uid,
        moodEntries: [{
          mID: Date.now(), // Verwenden Sie die aktuelle Zeit in Millisekunden als mID
          mood: index + 1,
          date: new Date(),
          color: emojis[index].color,
        }]
      });
    }
  };  

  return (
    <div>
      {isLoading ? <div><br></br><br></br>
                <Box>
                    <CircularProgress />
                </Box>
                <p>Moodtracker is loading...</p>
            </div> : (
        <div className='mood'>
          <h3 className='moodHeadline' style={{  fontSize: '1em'}}>Select your current mood</h3>
          <div className='moodemojis'>
            {emojis.map(({ emoji, label }, index) => (
              <div
                key={index}
                style={{ fontSize: '0.8em', marginRight: '10px', cursor: 'pointer', textAlign: 'center' }}
                onClick={() => handleMoodSelection(index)}
                role="button"
                tabIndex={0}
              >
                {emoji}
                <div style={{ fontSize: '0.8em' }}>{label}</div>
              </div>
            ))}
          </div>
          <div className='mood-status'></div>
          <div style={{ marginTop: '20px' }}>
          {moods.length > 0 ? (
            <div className='mood-section'>
            <h2 style={{ textAlign: 'center', fontSize: '1em', color: 'white' }}>Latest moods</h2>
              <MoodChart moods={moods} emojis={emojis} /></div>
            ) : (
              <label>[No Moods Detected Yet]</label>
            )}
          </div>
          {moods.length > 0 ? (
          <div className='mood-legend'>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <h2 style={{ textAlign: 'center', fontSize: '0.6em', color: 'black' }}>Legend:</h2>
            <br></br>
            {emojis.map(({ label, color }, index) => (

              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start', 
                  flexDirection: 'row',
                  marginRight: '10px'
                }}>
                <div style={{ backgroundColor: color, width: '10px', height: '10px', marginRight: '10px' }}></div>
                <p style={{ fontSize: '0.6em', color: 'black' }}>{label}</p>
                <br></br>
                <br></br>
            </div>
            ))}
            </div>
          </div>) : null}
        </div>
      )}
    </div>
  );
};