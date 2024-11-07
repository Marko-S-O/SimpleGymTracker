const exercises = [
    { name: 'Jalkakyykky', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },        
    { name: 'Reisikoukistus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },              
    { name: 'Pohkeet jalkaprässissä', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }]},                    
    { name: 'Penkkipunnerrus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }]},                                               
]

const currentWorkout = {
    created: new Date('2024-10-26T23:59:59Z'), 
    saved: new Date('2024-10-27T01:01:01Z'),
    exercises: exercises,
    notes: 'This is the current workout' 
}

const pastWorkouts = [
    {
        created: new Date('2023-10-26T23:59:59Z'), 
        saved: new Date('2023-10-27T01:01:01Z'),
        exercises: [...exercises],
        notes: 'This is a past workout'
    },
    {
        created: new Date('2022-10-26T23:59:59Z'), 
        saved: new Date('2022-10-27T01:01:01Z'),
        exercises: [...exercises],
        notes: 'This is a past workou 2t'
    },
    {
        created: new Date('2021-10-26T23:59:59Z'), 
        saved: new Date('2021-10-27T01:01:01Z'),
        exercises: [...exercises],
        notes: 'This is a past workout 3'
    }        
]

const programWorkouts = [{
    // Program workouts are workout templates and don't have timestamps
    exercises: [...exercises] 
}]

const currentProgram = { 
    name: 'Yleisohjelma',
    created: new Date('2024-10-26T23:59:59Z'), 
    saved: new Date('2024-10-27T01:01:01Z'),
    weeks: [{
        number: 1, 
        workouts: programWorkouts
    },
    {
        number: 2, 
        workouts: [...programWorkouts]
    },
    {
        number: 3, 
        workouts: [...programWorkouts]
    }],
    notes: 'This is the current program'
}

const pastPrograms = [
    { 
        name: 'Yleisohjelma',
        created: new Date('2023-10-26T23:59:59Z'), 
        saved: new Date('2023-10-27T01:01:01Z'),
        weeks: [{
            number: 1,
            workouts: programWorkouts
        },
        {
            number: 2,
            workouts: [...programWorkouts]
        }],
        notes: 'Yleinen ohjelma'
    },
    { 
        name: 'Maksimivoima',
        created: new Date('2022-10-26T23:59:59Z'), 
        saved: new Date('2022-10-27T01:01:01Z'),
        weeks: [{
            number: 1,
            workouts: [...programWorkouts]
        }],
        notes: 'Maksimivoimaohjelma'
    },
    { 
        name: 'Kestävyysharjoittelu',
        created: new Date('2021-10-26T23:59:59Z'), 
        saved: new Date('2021-10-27T01:01:01Z'),
        weeks: [{
            number: 1,
            workouts: [...programWorkouts]
        }],
        notes: 'This is another past program'
    }    
]


module.exports = {
    data: {
        username: 'testuser',
        token: 'test-token-123',
        currentWorkout: currentWorkout,
        pastWorkouts: pastWorkouts,
        currentProgram: currentProgram,
        pastPrograms: pastPrograms
    }
}


