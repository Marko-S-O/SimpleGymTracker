const exercises = [
    { name: 'Jalkakyykky', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },        
    { name: 'Reisikoukistus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },              
    { name: 'Pohkeet jalkaprässissä', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }]},                    
    { name: 'Penkkipunnerrus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }]},
    { name: 'Ylätalja', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                    
    { name: 'Olkapunnerrus käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                          
    { name: 'Hauiskääntö käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                
    { name: 'Vatsalihaspenkki', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                      
    { name: 'Selkäojennus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                            
    { name: 'Roikkuminen', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                                  
]

const currentWorkout = {
    created: '01.01.2024 00:11', 
    saved: '27.10.2024 23:59',
    exercises: exercises,
    notes: 'This is the current workout' 
}

const pastWorkouts = [{
    created: '01.01.2023 00:11', 
    saved: '27.10.2023 23:59',
    exercises: exercises,
    notes: 'This is a past workout' 
}]

const programWorkouts = [{
    // Program workouts are workout templates and don't have timestamps or notes
    exercises: exercises 
}]

const currentProgram = { 
    name: 'Yleisohjelma',
    created: '01.01.2024', 
    saved: '26.10.2024',
    weeks: [{
        number: 1, 
        days: [{
            number: 1,
            workouts: programWorkouts
        }]
    }],
    notes: 'This is the current program'
}

const pastPrograms = [
    { 
        name: 'Yleisohjelma',
        created: '01.01.2023', 
        saved: '26.10.2023',
        weeks: [{
            number: 1, 
            days: [{
                number: 1,
                workouts: programWorkouts
            }]
        }],
        notes: 'This is a past program'
    }
]

const data = {
    username: 'testuser',
    token: 'test-token-123',
    currentWorkout: currentWorkout,
    pastWorkouts: pastWorkouts,
    currentProgram: currentProgram,
    pastPrograms: pastPrograms,
}

const testData = {
    data    : data
}

export default testData