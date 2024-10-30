import AsyncStorage from '@react-native-async-storage/async-storage'
import testData from '../test/testData'

export const saveData = async (data) => {
    try {
        await saveDataLocal(data)
        return data
    } catch (error) {
        console.error('Error saving workout:', error)
        throw error
    }
}

export const saveDataLocal = async (data) => {
    try {
        await AsyncStorage.setItem(`gym-tracker-data`, JSON.stringify(data))
    } catch (error) {
        console.error('Local data save failed:', error)
    }
}

// Create unique ids for editable data structures. 
// These are technical, run-time ids that are not used elsewhere or stored.
// Instead of using copies of objects, modifying existing objects is assumed to be safe in this particular case 
// because this is executed asynchronously and beofre useEffect of the App component.
const createIds = (data) => {

    let exerciseId = 0
    let setId = 0
    data?.currentWorkout?.exercises?.map((exercise) => {
        exercise.id = exerciseId++
        exercise.sets?.map((set) => {
            set.id = setId++
            return set
        })
        return exercise

    })  

    data?.currentProgram?.weeks?.map((week) => {
        week.days?.map((day) => {
            day.exercises?.map((exercise) => {
                exercise.id = exerciseId++
                exercise.sets?.map((set) => {
                    set.id = setId++
                    return set
                })            
                return exercise    
            })
            return day
        })
        return week
    })
}

// Loop through past exercises to create a list of used exercises.
// This list is used to allow easy selection of exercise adding a new one to workout.
const createExerciseList = (data) => {
    const exerciseNameSet = new Set()
    data.pastWorkouts.forEach(workout => {
        workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))        
    })
    data.currentWorkout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))

    data.pastPrograms.forEach(program => {
        program.weeks.forEach(week => {
            week.workouts.forEach(workout => {
                workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
            })
        })
    })
    data.currentProgram.weeks.forEach(week => {
        week.workouts.forEach(workout => {
            workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
        })
    })

    const exerciseNames = [...exerciseNameSet].sort()
    data.exerciseNames = exerciseNames
    
}

const sortData = (data) => {
    data.pastWorkouts.sort((w1, w2) => w2.saved - w1.saved)
    data.pastPrograms.sort((p1, p2) => p2.saved - p1.saved)
}

const getEmptyData = () => {
    data = {
        currentWorkout: null,
        pastWorkouts: [],
        currentProgram: null,
        pastPrograms: [],
        exerciseNames: []
    }
    return data
}

export const readData = async () => {
    //console.log('getting data from the service...')
    //const data = testData.data
    //createIds(data)
    //createExerciseList(data)
    //sortData(data)

    return await readDataLocal()
}

export const readDataLocal = async () => {
    try {
        const data = await AsyncStorage.getItem(`gym-tracker-data`)
        if (data !== null) {
            console.log('Retrieved data:', JSON.parse(data))
            sortData(data)
            createIds(data)
            createExerciseList(data)
            return JSON.parse(data)
        } else {
            console.log('No data found')
            return getEmptyData()
        }
    } catch (error) {
        console.error('Failed to load data:', error)
        return getEmptyData()
    }
}