const admin = require('firebase-admin');
const serviceAccount = require('/Users/julianaderer/MAHAPP/mental-health-app/dbtestpatients-firebase-adminsdk-oqxaf-7a22eff591.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const patients = [
    {
        name: 'John Doe',
        age: 30,
        phone: '+1 (555) 555-5555',
        email: 'john.doe@example.com',
        appointments: [
            {
                date: new Date('2024-06-10').toISOString(),
                time: '10:00 AM',
                name: 'Follow-up Consultation',
                psychiatrist: 'Dr. Jane Smith',
            },
            {
                date: new Date('2024-07-25').toISOString(),
                time: '2:00 PM',
                name: 'Medication Review',
                psychiatrist: 'Dr. Jane Smith',
            },
        ],
        mood: 'Good',
    },
    {
        name: 'Jane Smith',
        age: 25,
        phone: '+1 (444) 444-4444',
        email: 'jane.smith@example.com',
        appointments: [
            {
                date: new Date('2024-06-12').toISOString(),
                time: '11:00 AM',
                name: 'Initial Consultation',
                psychiatrist: 'Dr. Michael Lee',
            },
        ],
        mood: 'Anxious',
    },
    {
        name: 'David Johnson',
        age: 42,
        phone: '+1 (333) 333-3333',
        email: 'david.johnson@example.com',
        appointments: [
            {
                date: new Date('2024-06-17').toISOString(),
                time: '3:00 PM',
                name: 'Therapy Session',
                psychiatrist: 'Dr. Sarah Jones',
            },
        ],
        mood: 'Neutral',
    },
    {
        name: 'Emily Williams',
        age: 18,
        phone: '+1 (222) 222-2222',
        email: 'emily.williams@example.com',
        appointments: [
            {
                date: new Date('2024-06-20').toISOString(),
                time: '9:00 AM',
                name: 'Group Therapy',
                psychiatrist: 'Dr. Charles Taylor',
            },
        ],
        mood: 'Happy',
    },
    {
        name: 'Robert Brown',
        age: 60,
        phone: '+1 (111) 111-1111',
        email: 'robert.brown@example.com',
        appointments: [
            {
                date: new Date('2024-06-24').toISOString(),
                time: '2:00 PM',
                name: 'Medication Check-in',
                psychiatrist: 'Dr. Jane Smith', // Same psychiatrist as John Doe
            },
        ],
        mood: 'Sad',
    },
    {
        name: 'Amanda Garcia',
        age: 35,
        phone: '+1 (777) 777-7777',
        email: 'amanda.garcia@example.com',
        appointments: [
            {
                date: new Date('2024-07-01').toISOString(),
                time: '1:00 PM',
                name: 'Progress Evaluation',
                psychiatrist: 'Dr. Michael Lee', // Same psychiatrist as Jane Smith
            },
        ],
        mood: 'Excellent',
    },
    {
        name: 'Christopher Clark',
        age: 52,
        phone: '+1 (666) 666-6666',
        email: 'christopher.clark@example.com',
        appointments: [
            {
                date: new Date('2024-07-08').toISOString(),
                time: '4:00 PM',
                name: 'Stress Management Techniques',
                psychiatrist: 'Dr. Sarah Jones', // Same psychiatrist as David Johnson
            },
        ],
        mood: 'Depressed',
    },
    {
        name: 'Olivia Lopez',
    }
];

patients.forEach(async (patient) => {
    await db.collection('patients').add(patient); // Replace 'patients' with your collection name
});

console.log('Test patient data successfully added to Firebase');
