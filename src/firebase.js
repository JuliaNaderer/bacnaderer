import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import 'core-js/features/symbol';
import { updateDoc, arrayUnion } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAKKLtmuK7zDE5y-jT4Senhq90G5b1C_OE",
  authDomain: "dbtestpatients.firebaseapp.com",
  projectId: "dbtestpatients",
  storageBucket: "dbtestpatients.appspot.com",
  messagingSenderId: "35080155801",
  appId: "1:35080155801:web:9f2c4e7553f617b103fe08",
  measurementId: "G-142VR4C9Q1"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getFirebaseAppointments = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const qb = query(collection(db, "patients2"), where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(qb);
    if (querySnapshot.docs.length > 0) {

      const appointments = querySnapshot.docs
        .flatMap((doc) => Object.values(doc.data().appointments).map((appointment) => ({ ...appointment })));
      return appointments;
    }
    else {
      console.log('No such patient!');
      return null;
    }

  } else {
    console.log('No user is signed in.');
    return null;
  }
}

const getUserSurveys = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log(currentUser.uid);
    const qb = query(collection(db, "surveys"), where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(qb);
    if (querySnapshot.docs.length > 0) {

      const surveys = querySnapshot.docs.map((doc) => doc.data());
      return surveys;
    }
    else {
      console.log('No such patient!');
      return null;
    }

  } else {
    console.log('No user is signed in.');
    return null;
  }
}

const getUserName = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log(currentUser.uid);
    const qb = query(collection(db, "patients2"), where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(qb);
    if (querySnapshot.docs.length > 0) {

      const name = querySnapshot.docs.map((doc) => doc.data().name);
      return name;
    }
    else {
      console.log('No such patient!');
      return null;
    }

  } else {
    console.log('No user is signed in.');
    return null;
  }
}

const getMoodEntries = async (uid) => {
  const qb = query(collection(db, "moods"), where("uid", "==", uid));
  const querySnapshot = await getDocs(qb);
  console.log(uid)
  if (!querySnapshot.empty) {
    const moodEntries = querySnapshot.docs.flatMap((doc) => doc.data().moodEntries);
    return moodEntries;
  } else {
    console.log('Keine Stimmungseinträge für diesen Benutzer gefunden!');
    return null;
  }
}

export const Mood = () => {
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        setUser(user); // Speichern Sie den Benutzer im Zustand
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
    };
  
    const moodEntryWithoutDate = {
      mid: moods.length, // Sie können die Länge des aktuellen moods-Arrays als mid verwenden
      mood: index + 1, // Add 1 to the index to get a number from 1 to 16
    };

    // Get a reference to the 'moods' collection
    const moodsCollection = doc(db, 'moods', user.uid); // Verwenden Sie user.uid anstelle von uid
    
    // Add the mood entry to Firestore
    try {
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
    }
  };
}; // Diese schließende Klammer und das Semikolon fehlten

export default app;
export { auth, getFirebaseAppointments, getUserSurveys, getUserName, getMoodEntries };
export { db };