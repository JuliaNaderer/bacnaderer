import { Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getFirebaseAppointments } from "../firebase";
import Scheduler from './Scheduler';


export const Appointments = () => {

    const [appointmentsVar, setAppointments] = useState([]);
    const myDivRef = useRef(null); // Create a ref for the div

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Benutzer ist angemeldet, hole seine Termine
                const userAppointments = await getFirebaseAppointments(); // Call the function to get appointments from Firebase
                setAppointments(userAppointments);
            } else {
                // Benutzer ist abgemeldet, leere die Termine
                setAppointments([]);
            }
        });
    
        // Aufräumen bei Unmount
        return () => unsubscribe();
    }, []);

    const handleCancel = (id: string) => {
        // Code to cancel an appointment
        console.log(`Appointment with ID ${id} has been canceled.`);
    };

    const handleChange = (id: string) => {
        // Code to change an appointment
        console.log(`Appointment with ID ${id} has been changed.`);
    };

    const handleDateChange = (date: Date) => {
        // Code to handle date change
        console.log('Selected date:', date);
    };

    const handleDateCancel = (date: Date) => {
        // Code to handle date change
        console.log('Selected date:', date);
    };

    return (
        <div>
            <br></br>
            <br></br>
            <Typography variant="h1">Your Appointments</Typography>
            <br></br>
            <br></br>
            <div className='schedulerComponent'>
                <Scheduler appointment={appointmentsVar}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/*
            <Container>
                        <br></br>
                        <br></br>
                        {appointmentsVar.map((appointment, index) => (
                             <div className='border' key={index}>
                                <h2>{appointment.name}</h2>
                                <p>{appointment.date}</p>
                                <p>{appointment.time}</p>
                                <p>{appointment.psychiatrist}</p>
                            </div>))}
                        </Container>*/}
        </div>
    );
};