import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getFirebaseAppointments } from "../firebase";
import Scheduler from './Scheduler';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Appointments = () => {

    const [appointmentsVar, setAppointments] = useState([]);
    const [isLoading, setLoading] = useState([]);
    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(true);
                // Benutzer ist angemeldet, hole seine Termine
                const userAppointments = await getFirebaseAppointments(); // Call the function to get appointments from Firebase
                if (userAppointments != null) {
                    userAppointments.forEach(element => {
                        element.startDate = new Date(element.startDate.seconds * 1000);
                        element.endDate = new Date(element.endDate.seconds * 1000);
                    });

                    if(userAppointments != null){
                        setAppointments(userAppointments);
                        setLoading(false);
                    }
                    else{
                        setAppointments([]);
                    }
                }
                else{
                    setLoading(false);
                    setIsNull(true);
                }

            } else {
                // Benutzer ist abgemeldet, leere die Termine
                setAppointments([]);
            }
        });
        // Aufräumen bei Unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {isNull ? <h1>[No Appointments Yet]</h1> : 
            <div>
            {isLoading ? <div>
                <Box>
                    <CircularProgress />
                </Box>
                <p>Appointments are loading...</p>
            </div> :
                <div className='schedulerComponent'>
                    <Scheduler appointments={appointmentsVar} />
                </div>}</div>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};