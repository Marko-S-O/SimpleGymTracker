export const getEmptyProgram = () => {
    
    const program = { 
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