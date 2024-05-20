import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import 'core-js/features/symbol';

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
    console.log(moodEntries);
    return moodEntries;
  } else {
    console.log('Keine Stimmungseinträge für diesen Benutzer gefunden!');
    return null;
  }
}

async function addMoodEntry(user, moodEntryWithoutDate) {
  const moodsCollection = doc(db, 'moods', user.uid);
  const docSnap = await getDoc(moodsCollection);

  if (!docSnap.exists()) {
    await setDoc(moodsCollection, {
      moodEntries: [{
        ...moodEntryWithoutDate,
        date: serverTimestamp(),
      }]
    });
  } else {
    await updateDoc(moodsCollection, {
      moodEntries: arrayUnion({
        ...moodEntryWithoutDate,
        date: serverTimestamp(),
      }),
    });
  }
}

  const updateMoodEntry = async (moodEntry) =>
  {
    const currentUser = auth.currentUser;
    // Erstellen Sie eine Abfrage, um das Dokument des Benutzers in der 'moods' Sammlung zu finden
    const q = query(collection(db, 'moods'), where('uid', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);

    // Überprüfen Sie, ob Dokumente gefunden wurden
    if (!querySnapshot.empty) {
      // Nehmen Sie das erste Dokument (es sollte nur ein Dokument pro Benutzer geben)
      const userDoc = querySnapshot.docs[0];

      console.log(moodEntry);
      // Fügen Sie den Mood-Eintrag zu Firestore hinzu
      await updateDoc(userDoc.ref, { moodEntries: arrayUnion(moodEntry) });

  }
}

const submitAnswer = async (surveyId, questionIndex, answer) => {

  var docID; 
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log(currentUser.uid);
    const qb = query(collection(db, "surveys"), where("id", "==", surveyId));
    const querySnapshot = await getDocs(qb);
    if (querySnapshot.docs.length > 0) {
      docID = querySnapshot.docs.map((doc) => ({
        did:doc.id,
        ...doc.data().did
      }));
    }}
    docID = docID[0].did;

    const surveyDocRef = doc(db, 'surveys', docID);
    const surveyDoc = await getDoc(surveyDocRef);

    if (surveyDoc.exists()) {
      const surveyData = surveyDoc.data();
      let answersArray = surveyData.answers || [];

      // Ensure the answers array has the correct length
      if (answersArray.length <= questionIndex) {
        answersArray = [...answersArray, ...Array(questionIndex - answersArray.length + 1).fill('')];
      }

      console.log(questionIndex);
      // Update the specific answer
      answersArray[questionIndex] = answer;

      // Update the document in Firestore
      await updateDoc(surveyDocRef, {
        answers: answersArray,
      });

      console.log('Answer submitted successfully.');
    } else {
      console.error('Survey not found for the given surveyId.');
    }
};

const updateStatus = async (surveyId) => {

  var docID;
  try {
    const qb = query(collection(db, "surveys"), where("id", "==", surveyId));
    const querySnapshot = await getDocs(qb);
    if (querySnapshot.docs.length > 0) {
      docID = querySnapshot.docs.map((doc) => ({
        did:doc.id,
        ...doc.data().did
      }));
    }
    docID = docID[0].did;

    const surveyDocRef = doc(db, 'surveys', docID);
    await updateDoc(surveyDocRef, {
      status: 'FINISHED',
    });
    console.log('Survey status updated to "Done".');
  } catch (error) {
    console.error('Error updating survey status:', error);
  }
};

const submitSurvey = async (surveyId, answers) => {
  try {
    await submitSurvey(surveyId, answers);
    console.log('Survey submitted successfully.');
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

const submitFeedback = async (rating, uifb, usfb, adfb) => {
  const currentUser = auth.currentUser;
  const did = Math.random().toString(16).slice(2)

  try {
    
    await setDoc(doc(db, "feedback", did), {
      uid: currentUser.uid,
      rating: rating,
      uifb: uifb,
      usfb: usfb,
      adfb: adfb
    });
    console.log('Survey submitted successfully.');
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

export default app;
export { auth, getFirebaseAppointments, getUserSurveys, getUserName, getMoodEntries, addMoodEntry, updateMoodEntry, submitAnswer, submitSurvey, updateStatus, submitFeedback};
export { db };