// Server communications part of this program makes use of the Uni Helsinki 
// FullStackOpen example program phonebook-app
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import testData from '../test/testData'

const isDevelopment = true
const API_URL = isDevelopment ? 'http://localhost:3001/api/data' : '/api/data'
const testUserId = 'testuser'

const getDataFromServer = async (username) => {

    try {
        const url = API_URL + '/' + testUserId
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const saveDataToServer = async (data) => {
    const response = await axios.put(API_URL, data)
    .catch(error => {
        // eslint-disable-next-line
        console.log(error)
    })
}

export const saveData = async (data) => {
    try {
        saveDataLocal(data)
        saveDataToServer(data)
        return data
    } catch (error) {
        console.error('Error saving data:', error)
    }
}

export const saveDataLocal = async (data) => {
    try {
        await AsyncStorage.setItem(`gym-tracker-data`, JSON.stringify(data))
    } catch (error) {
        console.error('Error saving data to local storage:', error)
    }
}

// Fix serialized dates and re-build the list of used exercise names to be used in UI
const fixDatesAndExerciseList = (data) => {
    const fixedData = {...data}
    const exerciseNameSet = new Set()

    if(fixedData.currentWorkout) {
        fixedData.currentWorkout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))
        fixedData.currentWorkout.created = new Date(fixedData.currentWorkout.created)
        fixedData.currentWorkout.saved = new Date(fixedData.currentWorkout.saved)
    }

    fixedData.pastWorkouts.forEach(workout => {
        workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))        
        workout.created = new Date(workout.created)
        workout.saved = new Date(workout.saved)
    })

    fixedData.currentProgram.weeks.forEach(week => {
        week.workouts.forEach(workout => {
            workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
        })
    })

    if(fixedData.currentProgram) {
        fixedData.currentProgram.created = new Date(fixedData.currentProgram.created)
        fixedData.currentProgram.saved = new Date(fixedData.currentProgram.saved)    
    }

    fixedData.pastPrograms.forEach(program => {
        program?.weeks.forEach(week => {
            week.workouts.forEach(workout => {
                workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
            })
        })
        program.created = new Date(program.created)
        program.saved = new Date(program.saved)
    })



    const exerciseNames = [...exerciseNameSet].sort()
    fixedData.exerciseNames = exerciseNames
    return fixedData
    
}

const sortData = (data) => {
    const sortedData = {...data}
    sortedData.pastWorkouts.sort((w1, w2) => w2.saved - w1.saved)
    sortedData.pastPrograms.sort((p1, p2) => p2.saved - p1.saved)
    return sortedData
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

const readDataLocal = async () => {
    try {
        const localData = await AsyncStorage.getItem(`gym-tracker-data`)
        if (localData !== null) {
            return JSON.parse(localData)
        } else {
            console.log('No data found')
        }
    } catch (error) {
        console.error('Failed to load data:', error)
        return getEmptyData()
    }
}

export const readData = async () => {
    let data = testData.data
    
    //const storedData = await readDataLocal()    
    //let data = storedData.data

    response = await getDataFromServer()
    console.log(response)

    data = fixDatesAndExerciseList(data)
    data = sortData(data)

    return data    

}

