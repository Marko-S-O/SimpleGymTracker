import AsyncStorage from '@react-native-async-storage/async-storage'
import testData from '../test/testData'


export const saveData = async (data) => {
    try {

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
// These are technical, run-time ids are not used elsewhere or stored.
// Instead of using copies, modifying existing objects is assumed to be safe in this particular case.
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

export const readData = async () => {
    const data = testData.data
    createIds(data)
    return data
}

export const readDataLocal = async () => {
    const data = testData.data
    return data
}