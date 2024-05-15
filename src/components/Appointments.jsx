import React from 'react';

export const Appointments = ({ appointments, onCancel, onChange }) => {
    return (
        <div>
            {appointments.map((appointment, index) => (
                <div>
                    <h2>{appointment.title}</h2>
                    <p>{appointment.time}</p>
                </div>
            ))}
        </div>
    );
};