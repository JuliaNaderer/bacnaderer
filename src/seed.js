const admin = require('firebase-admin');
const serviceAccount = require('/Users/julianaderer/Desktop/IIM/BAC/Praxis/MentalHealthApp/bacnaderer/dbtestpatients-firebase-adminsdk-oqxaf-7a22eff591.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let patients = [
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
        age: 28,
        phone: '+1 (888) 888-8888',
        email: 'olivia.naderer@protonmail.com',
        appointments: [
            {
                date: new Date('2024-06-15').toISOString(),
                time: '10:00 AM',
                name: 'Initial Consultation',
                psychiatrist: 'Dr. Michael Lee',
            },
            {
                date: new Date('2024-07-20').toISOString(),
                time: '2:00 PM',
                name: 'Follow-up Consultation',
                psychiatrist: 'Dr. Sarah Jones',
            },
            {
                date: new Date('2024-08-25').toISOString(),
                time: '1:00 PM',
                name: 'Therapy Session',
                psychiatrist: 'Dr. Charles Taylor',
            },
        ],
        mood: 'Good',
    },
    {
        name: 'Julia Naderer',
        age: 28,
        phone: '+1 (888) 888-8888',
        email: 'julia.naderer@protonmail.com',
        appointments: [
            {
                date: new Date('2024-06-15').toISOString(),
                time: '10:00 AM',
                name: 'Initial Consultation',
                psychiatrist: 'Dr. Michael Lee',
            },
            {
                date: new Date('2024-07-20').toISOString(),
                time: '2:00 PM',
                name: 'Follow-up Consultation',
                psychiatrist: 'Dr. Sarah Jones',
            },
            {
                date: new Date('2024-08-25').toISOString(),
                time: '1:00 PM',
                name: 'Therapy Session',
                psychiatrist: 'Dr. Charles Taylor',
            },
        ],
        mood: 'Good',
    },
    {
        name: 'Florian Naderer',
        age: 30,
        phone: '+1 (999) 999-9999',
        email: 'florianxnaderer@gmail.com',
        appointments: [
            {
                date: new Date('2024-06-18').toISOString(),
                time: '11:00 AM',
                name: 'Initial Consultation',
                psychiatrist: 'Dr. Jane Smith',
            },
            {
                date: new Date('2024-07-23').toISOString(),
                time: '3:00 PM',
                name: 'Follow-up Consultation',
                psychiatrist: 'Dr. Michael Lee',
            },
            {
                date: new Date('2024-08-28').toISOString(),
                time: '4:00 PM',
                name: 'Therapy Session',
                psychiatrist: 'Dr. Sarah Jones',
            },
        ],
        mood: 'Neutral',
    },
    
    {
        name: 'Jules Wules',
        age: 92,
        phone: '+1 (777) 777-7777',
        email: 'julila.naderer@gmail.com',
        appointments: [
            {
                date: new Date('2024-06-20').toISOString(),
                time: '9:00 AM',
                name: 'Initial Consultation',
                psychiatrist: 'Dr. Charles Taylor',
            },
            {
                date: new Date('2024-07-25').toISOString(),
                time: '2:00 PM',
                name: 'Follow-up Consultation',
                psychiatrist: 'Dr. Jane Smith',
            },
            {
                date: new Date('2024-08-30').toISOString(),
                time: '1:00 PM',
                name: 'Therapy Session',
                psychiatrist: 'Dr. Michael Lee',
            },
        ],
        mood: 'Sad',
    },
];
const createFirebaseAuthAccount = async (patient) => {
    try {
        const user = await admin.auth().createUser({
            email: patient.email,
            password: '00000000', // Setzen Sie hier ein sicheres Passwort
        });
        console.log('Successfully created new user:', user.uid);
        return user.uid; // Rückgabe der von Firebase generierten UID
    } catch (error) {
        console.log('Error creating new user:', error);
    }
};

const deleteDuplicatePatients = async () => {
    const snapshot = await db.collection('patients').get();
    const promises = [];
    snapshot.forEach((doc) => {
        const patient = doc.data();
        // Stellen Sie sicher, dass die Firebase UID verwendet wird
        db.collection('patients').where('firebaseUid', '==', patient.firebaseUid).get()
            .then((querySnapshot) => {
                let count = 0;
                querySnapshot.forEach((doc) => {
                    count++;
                    // Lösche den Eintrag, wenn es mehr als einen Patienten mit derselben Firebase UID gibt
                    if (count > 1) {
                        promises.push(doc.ref.delete());
                    }
                });
            });
    });
    await Promise.all(promises);
    console.log('Doppelte Patienten erfolgreich gelöscht.');
};

deleteDuplicatePatients();

const addOrUpdatePatients = async () => {
    const promises = [];
    patients.forEach((patient) => {
        if (patient.uid) { // Überprüfen Sie, ob uid definiert ist
            db.collection('patients').where('uid', '==', patient.uid).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        // Füge den Patienten hinzu, wenn er noch nicht existiert
                        promises.push(db.collection('patients').add(patient)
                            .then((docRef) => {
                                patient.firebaseUid = docRef.id; // Setze die firebaseUid Eigenschaft
                                console.log(`Füge neuen Patienten hinzu mit firebaseUid: ${docRef.id}`);
                            }));
                    } else {
                        // Aktualisiere den Patienten, wenn er bereits existiert
                        querySnapshot.forEach((doc) => {
                            promises.push(doc.ref.update(patient));
                            console.log(`Aktualisiere existierenden Patienten mit firebaseUid: ${doc.id}`);
                        });
                    }
                });
        }
    });
    await Promise.all(promises);
    console.log('Patienten erfolgreich hinzugefügt oder aktualisiert.');
};

const managePatients = async () => {
    for (let patient of patients) {
        patient.uid = await createFirebaseAuthAccount(patient); // Speichern Sie die Firebase UID im Patientenobjekt
        console.log(`Setze uid für Patienten: ${patient.uid}`);
    }
    await addOrUpdatePatients();
};

managePatients();