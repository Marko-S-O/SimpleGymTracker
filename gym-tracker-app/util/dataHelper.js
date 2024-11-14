export const getEmptyProgram = () => {    
    const program = { 
        name: '',
        created: new Date(), 
        saved: null,
        weeks: [{
            workouts:[{
                exercises: [],
                notes: ''
            }]
        }],
    }
    return program
}

export const getEmptyWorkout = () => {
    const workout = {
        created: new Date(), 
        exercises: [],
        notes: ''        
    }
    return workout
}

export const getEmptyData = () => {
    const data = {
        currentWorkout: null,
        pastWorkouts: [],
        currentProgram: null,
        pastPrograms: [],
        exerciseNames: [],
        username: '',
        token: ''
    }
    return data
}
