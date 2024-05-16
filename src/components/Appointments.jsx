import { Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getFirebaseAppointments } from "../firebase";


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
            <Typography variant="h1">Appointments</Typography>
            <Container>
                <DatePicker selected={new Date()} onChange={handleDateChange} />
                <br></br>
                <br></br>
                    <div>
                        {appointmentsVar.map((appointment, index) => (
                            <div className='border' key={index}>
                                <h2>{appointment[index].name}</h2>
                                <p>{appointment[index].date}</p>
                                <p>{appointment[index].time}</p>
                                <p>{appointment[index].psychiatrist}</p>
                            </div>
                        ))}
                        <br></br>
                        <br></br>
                    </div>
            </Container>
        </div>
    );
};