import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Line } from 'react-chartjs-2';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getMoodEntries, saveMoodEntries } from '../firebase';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import MoodChart from './MoodChart';


const auth = getAuth();
const db = getFirestore();

const emojis = ['😄', '😃', '😀', '😊', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑'];

export const Mood = ({ uid }) => {
  const [moods, setMoods] = useState([]);
  console.log('UID:', uid);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        const moodEntries = await getMoodEntries(user.uid);
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
    const moodEntry = {
      mid: moods.length, // Sie können die Länge des aktuellen moods-Arrays als mid verwenden
      mood: index,
      date: serverTimestamp(),
    };
    console.log('moodEntry:', moodEntry);

    // Get a reference to the 'moods' collection
    const moodsCollection = doc(db, 'moods', uid);

    // Add the mood entry to Firestore
    try {
      const newMoods = await saveMoodEntries(moodEntry);
      setMoods(newMoods);
      console.log('Mood saved!');
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
             <h2>Stimmungsverlauf:</h2>
             {moods.length > 0 ? (
                <MoodChart moods={moods} />
            ) : (
               <div>Keine Stimmungen bisher erfasst</div>
              )}
            </div>
        </div>
      )}
    </div>
  );
};