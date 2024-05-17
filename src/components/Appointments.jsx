import {Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getFirebaseAppointments } from "../firebase";
import Scheduler from './Scheduler';

export const Appointments = () => {

    const [appointmentsVar, setAppointments] = useState([]);
    const [isLoading, setLoading] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(true);
                // Benutzer ist angemeldet, hole seine Termine
                const userAppointments = await getFirebaseAppointments(); // Call the function to get appointments from Firebase
                console.log(userAppointments);
                userAppointments.forEach(element => {
                        element.startDate = new Date(element.startDate.seconds*1000);
                        element.endDate = new Date(element.endDate.seconds*1000);
                });
                setAppointments(userAppointments);
                setLoading(false);
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
            <Typography variant="h1">Your Appointments</Typography>
            <br></br>
            <br></br>
            <br></br>
            {isLoading ? <p>Appointments are Loading...</p> :             
            <div className='schedulerComponent'>
                <Scheduler appointments={appointmentsVar}/>
            </div>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};