// Server communications part of this program makes use of the Uni Helsinki 
// FullStackOpen example program 
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import testData from '../test/testData'
import { Platform } from 'react-native'

const isDevelopment = true
const TEST_API_URL = Platform.OS == 'android' ? 'http://10.0.2.2:3001/api/data' : 'http://localhost:3001/api/data' 
const testUserId = 'testuser'


const saveDataToServer = async (data) => {

    try {
        const url = API_URL + '/' + testUserId
        const response = await axios.put(url, data)
    } catch (error) {
        // eslint-disable-next-line
        console.log('Error saving data to server', error)
    }
}

export const saveData = async (data) => {

    try {
        saveDataLocal(data)
    } catch (error) {
        console.error('Error saving data locally', error)
    }

    try {
        saveDataToServer(data)
    } catch (error) {
        console.error('Error saving data to server', error)
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

    if(fixedData.pastWorkouts) {
        fixedData.pastWorkouts.forEach(workout => {
            workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))        
            workout.created = new Date(workout.created)
            workout.saved = new Date(workout.saved)
        })
    }

    if(fixedData.currentProgram) {
        fixedData.currentProgram.weeks.forEach(week => {
            week.workouts.forEach(workout => {
                workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
            })
        })
        fixedData.currentProgram.created = new Date(fixedData.currentProgram.created)
        fixedData.currentProgram.saved = new Date(fixedData.currentProgram.saved)
    }

    if(fixedData.pastPrograms) {
        fixedData.pastPrograms.forEach(program => {
            program?.weeks.forEach(week => {
                week.workouts.forEach(workout => {
                    workout.exercises.forEach(exercise => exerciseNameSet.add(exercise.name))     
                })
            program.created = new Date(program.created)
            program.saved = new Date(program.saved)                
            })
        })
    }

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

const selectNewer = (object1, object2) => {
    return object1.created >= object2.created ? object1 : object2
}

// Merge server and local data. This is done always when reading the data. Reading data
// Only happens when there is no existing session or user invokes the refresh action in UI.
//
// Merge strategy:
// - Take newer of the current workout and current program (saved timestamp)
// - Merge past workouts and past programs
// - Remove duplicates in pastWorkouts and pastPrograms (same saved timestamp)
// - After merge, update the merged data to the server and local storage
const mergeData = (localData, serverData) => {

    currentWorkout = localData.currentWorkout && serverData.currentWorkout ?
        selectNewer(localData.currentWorkout, serverData.currentWorkout) :
        localData.currentWorkout || serverData.currentWorkout

    currentProgram = localData.currentProgram && serverData.currentProgram ?
        selectNewer(localData.currentProgram, serverData.currentProgram) : 
        localData.currentProgram || serverData.currentProgram


    let pastWorkouts = localData.pastWorkouts ? localData.pastWorkouts : []
    if(serverData.pastWorkouts) {
        pastWorkouts = pastWorkouts.concat(serverData.pastWorkouts)
    }
    const workoutMap = new Map(pastWorkouts.map(workout => [workout.saved, workout]))
    pastWorkouts = Array.from(workoutMap.values())


    let pastPrograms = localData.pastPrograms ? localData.pastPrograms : []
    if(serverData.pastPrograms) {
        pastPrograms = pastPrograms.concat(serverData.pastPrograms)
    }
    const programMap = new Map(pastPrograms.map(program => [program.saved, program]))
    pastPrograms = Array.from(programMap.values())

    const username = serverData.username ? serverData.username : localData.username

    const mergedData = {
        currentWorkout: currentWorkout,
        currentProgram: currentProgram,
        pastWorkouts: pastWorkouts,
        pastPrograms: pastPrograms,
        username: username
    }

    return mergedData
}

const readDataLocal = async () => {

    try {
        const localInput = await AsyncStorage.getItem(`gym-tracker-data`)
        if (localInput !== null) {
            localData = JSON.parse(localInput)            
            return localData.data
        } else {
            console.log('No local data found')
            return getEmptyData()
        }
    } catch (error) {
        console.error('Failed to read local data:', error)
        return getEmptyData()
    }
}

const readDataServer = async () => {

    try {
        const url = API_URL + '/' + testUserId
        const response = await axios.get(url)
        const serverData = response.data.data
        if (serverData !== null) {
            const data = JSON.parse(serverData)
            return data
        } else {
            console.log('No server data found')
            return getEmptyData()
        }
    } catch (error) {
        console.error('Failed to read server data:', error)
        return getEmptyData()
    }
}

export const readData = async () => {

    //let data = testData.data
    
    const localData = await readDataLocal()    
    const serverData = await readDataServer()

    let data = mergeData(localData, serverData)
    data = fixDatesAndExerciseList(data)
    data = sortData(data)

    return data    

}

