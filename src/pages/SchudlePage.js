import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography } from '@mui/material';
import {Appointments} from '../components/Appointments';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getFirebaseAppointments } from "../firebase";

export const SchedulePage = () => {
    const [appointments, setAppointments] = useState([]);
    const myDivRef = useRef(null); // Create a ref for the div

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Benutzer ist angemeldet, hole seine Termine
                const userAppointments = await getFirebaseAppointments(); // Call the function to get appointments from Firebase
                console.log(userAppointments);
                setAppointments(userAppointments);
                console.log(appointments);
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

    return (
        <div>
            <Typography variant="h1">SchedulePage</Typography>
            <Container>
                <DatePicker selected={new Date()} onChange={handleDateChange} />
                <Appointments appointments={appointments} onCancel={handleCancel} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={() => console.log('Button clicked!')}>
                    Button
                </Button>
            </Container>
            <div ref={myDivRef}>This div is now reachable</div>
        </div>
    );
};