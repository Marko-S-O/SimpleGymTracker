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
        userId: null,
        currentWorkout: null,
        pastWorkouts: [],
        currentProgram: null,
        pastPrograms: [],
        exerciseNames: [],
    }
    return data
}

export const createExerciseList = (data) => {

    const exerciseNameSet = new Set()

    data.currentWorkout?.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))

    data.pastWorkouts?.forEach(workout => {
        workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))        
    })

    data.currentProgram?.weeks?.forEach(week => {
        week.workouts?.forEach(workout => {
            workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))     
        })
    })

    data.pastPrograms?.forEach(program => {
        program?.weeks?.forEach(week => {
            week.workouts?.forEach(workout => {
                workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))     
            })
        })
    })

    const exerciseNames = [...exerciseNameSet].sort()
    return exerciseNames
}
