// Server communications part of this program makes use of the Uni Helsinki 
// FullStackOpen example program 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import axios from 'axios'
import { getEmptyData } from '../util/dataHelper'

const API_URL = Platform.OS == 'android' ? 'http://10.0.2.2:3001/api/data' : 'http://localhost:3001/api/data' 

const saveDataToServer = async (data) => {

    console.log('Saving data to server')
    //console.trace("Logging call stack")
    //console.log(data)
    try {
        const url = API_URL + '/' + data.username;
        const response = await axios.put(url, data)
        return response.data
    } catch (error) {
        // eslint-disable-next-line
        console.log('Error saving data to server', error)
    }
}

export const saveDataLocal = async (data) => {

    try {
        data.data.username = data.username;
        await AsyncStorage.setItem(`gym-tracker-data`, JSON.stringify(data))
    } catch (error) {
        console.error('Error saving data to local storage:', error)
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


// Fix serialized dates to Date objects
const convertDates = (data) => {
    const fixedData = {...data}

    if (fixedData.currentWorkout?.created) {
        fixedData.currentWorkout.created = new Date(fixedData.currentWorkout.created)
    }
    if (fixedData.currentWorkout?.saved) {
        fixedData.currentWorkout.saved = new Date(fixedData.currentWorkout.saved)
    }

    fixedData.pastWorkouts?.forEach(workout => {
        workout.created = new Date(workout.created)
        workout.saved = new Date(workout.saved)
    })

    if (fixedData.currentProgram?.created) {
        fixedData.currentProgram.created = new Date(fixedData.currentProgram.created)
    }
    if (fixedData.currentProgram?.saved) {
        fixedData.currentProgram.saved = new Date(fixedData.currentProgram.saved)
    }

    fixedData.pastPrograms?.forEach(program => {
        program.created = new Date(program.created)
        program.saved = new Date(program.saved)     
    })
    return fixedData
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

const sortData = (data) => {
    const sortedData = {...data}
    sortedData.pastWorkouts.sort((w1, w2) => w2.saved - w1.saved)
    sortedData.pastPrograms.sort((p1, p2) => p2.saved - p1.saved)
    return sortedData
}


const selectNewer = (object1, object2) => {

    return object1.saved >= object2.saved ? object1 : object2
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

    const currentWorkout = localData.currentWorkout && serverData.currentWorkout ?
        selectNewer(localData.currentWorkout, serverData.currentWorkout) :
        localData.currentWorkout || serverData.currentWorkout

    const currentProgram = localData.currentProgram && serverData.currentProgram ?
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

    if(usernmame == null || username.length == 0) {
        console.log('No username found in merge')
    }

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
            let localData = JSON.parse(localInput)    
            localData = convertDates(localData.data)
            localData = sortData(localData)
            return localData
        } else {
            console.log('No local data found')
            return getEmptyData()
        }
    } catch (error) {
        console.error('Failed to read local data:', error)
        return getEmptyData()
    }
}

export const readDataServer = async (username) => {

    try {
        const url = API_URL + '/' + username
        const response = await axios.get(url)
        const serverInput = response.data.data
        if (serverInput !== null) {
            let serverData = JSON.parse(serverInput)
            serverData = convertDates(serverData)
            serverData = sortData(serverData)
            return serverData
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
    const username  = localData.username 
    const serverData = await readDataServer(username)
    //console.log('---- LOCAL')
    //console.log(localData)
    //console.log('---- REMOTE')
    //console.log(serverData)

    let data = mergeData(localData, serverData)
    data = createExerciseList(data)
    data = sortData(data)

    //console.log('---- MERGED')
    //console.log(data)

    return data    
}

export const hasLocalData = async () => {
    try {
        const localInput = await AsyncStorage.getItem(`gym-tracker-data`)
        hasData = localInput != null
        return hasData

    } catch (error) {
        console.error('Failed to read local data in hasLocalData:', error)
        return false
    }
    
}

