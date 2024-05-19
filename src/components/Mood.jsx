// Importe am Anfang der Datei
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Line } from 'react-chartjs-2';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getMoodEntries, saveMoodEntries } from '../firebase';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import MoodChart from './MoodChart';
import { color } from 'devextreme-react/cjs/chart';



const emojis = [
  { emoji: '😄', label: 'Excited', Color: '#FFCE43' },
  { emoji: '😃', label: 'Happy', Color: '#FFC1E7' },
  { emoji: '😞', label: 'Sad', Color: '#3498DB' },
  { emoji: '😔', label: 'Dissapointed', Color: '#9B59B6' },
  { emoji: '😌', label: 'Calm', Color: '#90EE90' },
  { emoji: '😰', label: 'Anxious', Color: '#E74C3C' }, 
  { emoji: '😒', label: 'Jealous', Color: '#38D39F' },
  { emoji: '😀', label: 'Energetic', Color: '#F859B7' },
  { emoji: '😍', label: 'Loved', Color: '#FFE08C'},
  { emoji: '😊', label: 'Creative', Color: '#FFE559' },
  { emoji: '😟', label: 'Lonely', Color: '#A9D7D3' },
  { emoji: '😠', label: 'Iritated', Color: '#EAC117 ' },
  { emoji: '😤', label: 'Frustrated', Color: '#C62828' },
  { emoji: '😵', label: 'Lost', Color: '#D670AF' },
  { emoji: '😴', label: 'Tired', Color: '#474747' },
  { emoji: '😇', label: 'Grateful', Color:'#9CCC65' },
];

const auth = getAuth();
const db = getFirestore();

export const Mood = () => {
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Speichern Sie den Benutzer im Zustand
        // ...
      } else {
        console.error('Kein Benutzer ist angemeldet.');
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setIsLoading(true);
  //       const moodEntries = await getMoodEntries(user.uid);
  //       if (moodEntries) {
  //         setMoods(moodEntries);
  //       }
  //       setIsLoading(false);
  //     } else {
  //       console.error('Kein Benutzer ist angemeldet.');
  //     }
  //   });
  
  //   // Cleanup function
  //   return () => unsubscribe();
  // }, []);

  const handleMoodSelection = async (index) => {
    if (!user) {
      console.error('Kein Benutzer ist angemeldet.');
      return;
    }
  
    const moodEntry = {
      mid: moods.length, // Sie können die Länge des aktuellen moods-Arrays als mid verwenden
      mood: index + 1, // Add 1 to the index to get a number from 1 to 16
      date: serverTimestamp(),
    };
    console.log('moodEntry:', moodEntry);
  
    // Get a reference to the 'moods' collection
    const moodsCollection = doc(db, 'moods', user.uid); // Verwenden Sie user.uid anstelle von uid
    
    // Add the mood entry to Firestore
try {
  // Erstelle ein neues moodEntry ohne das Datum
  const moodEntryWithoutDate = {
    mid: moods.length, // Sie können die Länge des aktuellen moods-Arrays als mid verwenden
    mood: index + 1, // Add 1 to the index to get a number from 1 to 16
  };

  // Füge das Datum zum Dokument hinzu
  await updateDoc(moodsCollection, {
    date: serverTimestamp(),
  });

  // Füge das moodEntry zum Array hinzu
  await updateDoc(moodsCollection, {
    moodEntries: arrayUnion(moodEntryWithoutDate), // Change 'entries' to 'moodEntries' to match your database structure
  });

  // Füge das Datum zum lokalen moodEntry hinzu
  const moodEntry = {
    ...moodEntryWithoutDate,
    date: new Date(), // Verwende das aktuelle Datum
  };

  setMoods(prevMoods => [...prevMoods, moodEntry]);
  console.log('Mood saved!');
} catch (error) {
  console.error('Error saving mood:', error);
  };
};

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='mood'>
          <h3 className='moodHeadline' style={{  fontSize: '1em'}}>Select your current mood:</h3>
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
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ textAlign: 'left', fontSize: '1em', color: 'black' }}>Latest moods:</h2>
            {moods.length > 0 ? (
              <MoodChart moods={moods} emojis={emojis} />
            ) : (
              <div>Keine Stimmungen bisher erfasst</div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <h2 style={{ textAlign: 'left', fontSize: '0.6em', color: 'black' }}>Legend:</h2>
            {emojis.map(({ label, Color }, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start', 
                  flexDirection: 'row',
                  marginRight: '10px'
                }}>
                <div style={{ backgroundColor: Color, width: '10px', height: '10px', marginRight: '10px' }}></div>
                <div style={{ fontSize: '0.6em', color: 'black' }}>{label}</div>
            </div>
))}
</div>
</div>
)}
</div>
);
}; // Hier fehlt die schließende Klammer für die Komponentenfunktion