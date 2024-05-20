const admin = require('firebase-admin');
const serviceAccount = require('../dbtestpatients-firebase-adminsdk-oqxaf-7a22eff591.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

    const db = admin.firestore();

    let patients = [
        {
            name: 'John Doe',
            age: 30,
            phone: '+1 (555) 555-5555',
            email: 'mosira1881@huleos.com',
            uid: '',
            appointments: [
                {
                    title: 'Customer Workshop',
                    startDate: new Date(2024, 6, 1, 10, 0),
                    endDate: new Date(2024, 6, 3, 14, 30),
                    allDay: true,
                    id: 39,
                    location: 'Room 1',
                    psychaiatrist: 'TEST 1',
                },
                {
                    title: 'Customer Workshop',
                    startDate: new Date(2024, 6, 1, 12, 0),
                    endDate: new Date(2024, 6, 3, 14, 30),
                    allDay: true,
                    id: 39,
                    location: 'Room 1',
                    psychaiatrist: 'TEST 2',
                },
                {
                    title: 'Customer Workshop',
                    startDate: new Date(2024, 7, 1, 12, 0),
                    endDate: new Date(2024, 7, 3, 14, 30),
                    allDay: true,
                    id: 39,
                    location: 'Room 1',
                    psychaiatrist: 'TEST 3',
                },
                {
                    title: 'Customer Workshop',
                    startDate: new Date(2024, 6, 1),
                    endDate: new Date(2024, 6, 2),
                    allDay: true,
                    id: 39,
                    location: 'Room 1',
                    psychaiatrist: 'TEST 4',
                },
            ],
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


const addOrUpdatePatients = async () => {
    const promises = [];
    patients.forEach((patient) => {
        if (patient.uid) { // Überprüfen Sie, ob uid definiert ist
            db.collection('patients2').where('uid', '==', patient.uid).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        // Füge den Patienten hinzu, wenn er noch nicht existiert
                        promises.push(db.collection('patients2').add(patient)
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