// Appointments.jsx
import React from 'react';

const Appointments = ({ appointments, onCancel, onChange }) => {
    return (
        <div>
            {appointments.map((appointment, index) => (
                <div key={index}>
                    <h2>{appointment.title}</h2>
                    <p>{appointment.time}</p>
                    <button onClick={() => onCancel(appointment.id)}>Cancel appointment</button>
                    <button onClick={() => onChange(appointment.id)}>Modify appointment</button>
                </div>
            ))}
        </div>
    );
};

export default Appointments;