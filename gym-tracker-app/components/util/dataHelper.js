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
    return workout;
}

const createExerciseList = (data) => {

    const fixedData = {...data}
    const exerciseNameSet = new Set()

    fixedData.currentWorkout?.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))

    fixedData.pastWorkouts?.forEach(workout => {
        workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))        
    })

    fixedData.currentProgram?.weeks?.forEach(week => {
        week.workouts?.forEach(workout => {
            workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))     
        })
    })

    fixedData.pastPrograms?.forEach(program => {
        program?.weeks?.forEach(week => {
            week.workouts?.forEach(workout => {
                workout.exercises?.forEach(exercise => exerciseNameSet.add(exercise.name))     
            })
        })
    })

    const exerciseNames = [...exerciseNameSet].sort()
    fixedData.exerciseNames = exerciseNames
    return fixedData
}