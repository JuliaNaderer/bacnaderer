import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

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
    console.log(currentUser.uid);
    const qb = query(collection(db, "patients2"), where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(qb);
    if(querySnapshot.docs.length > 0){

      const appointments = querySnapshot.docs
      .flatMap((doc) => Object.values(doc.data().appointments).map((appointment) => ({...appointment})));
      console.log(appointments);
      return appointments;
    }
    else{
      console.log('No such patient!');
      return null;
    }
      
   }else {
    console.log('No user is signed in.');
    return null;
   }
} 
export default app;
export {auth, getFirebaseAppointments};