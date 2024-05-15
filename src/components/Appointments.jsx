import React from 'react';

export const Appointments = ({ appointments, onCancel, onChange }) => {

    return (
        <h1>Test
        <div>{appointments.length}</div>
        <div>
            {appointments.map((appointment, index) => (
                <div key={index}>
                    <h2>{appointment[index].time}</h2>
                    <p>{appointment[index].name}</p>
                    <p>{appointment[index].psychiatrist}</p>
                    <p>{appointment[index].date}</p>
                </div>
            ))}
        </div>
        </h1>
    );
};