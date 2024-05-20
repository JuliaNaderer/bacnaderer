// Importe am Anfang der Datei
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, doc, arrayUnion, serverTimestamp, setDoc, updateDoc, getDoc, collection, getDocs, where, query  } from 'firebase/firestore';
import { getMoodEntries } from '../firebase';
import MoodChart from './MoodChart';

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
  
    const moodEntry = {
      mID: moods.length, // Sie können die Länge des aktuellen moods-Arrays als mid verwenden
      mood: index + 1, // Add 1 to the index to get a number from 1 to 16
      date: new Date(), // Erzeugen Sie den aktuellen Zeitstempel auf der Clientseite
    };
  
    // Erstellen Sie eine Abfrage, um das Dokument des Benutzers in der 'moods' Sammlung zu finden
    const q = query(collection(db, 'moods'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    
    // Überprüfen Sie, ob Dokumente gefunden wurden
    if (!querySnapshot.empty) {
      // Nehmen Sie das erste Dokument (es sollte nur ein Dokument pro Benutzer geben)
      const userDoc = querySnapshot.docs[0];
  
      // Fügen Sie den Mood-Eintrag zu Firestore hinzu
      await updateDoc(userDoc.ref, { moods: arrayUnion(moodEntry) });
  
      setMoods(prevMoods => [...prevMoods, moodEntry]);
      console.log('Mood saved!');
    } else {
      console.error('Kein Dokument gefunden für Benutzer:', user.uid);
    }
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
};