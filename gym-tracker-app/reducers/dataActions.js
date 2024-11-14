import * as actionTypes from './actionTypes'

export const setupUser = (username) => ({
    type: actionTypes.SETUP_USER,
    payload: {  
        username: username,
        token: null,
        currentWorkout: null,
        pastWorkouts: [],
        currentProgram: null,
        pastPrograms: [],
        exerciseNames: []        
    }
})

export const setData = (data) => ({
    type: actionTypes.SET_DATA,
    payload: { ...data }
})

export const setCurrentWorkout = (workout) => ({
    type: actionTypes.SET_CURRENT_WORKOUT,
    payload: workout
})

export const finishCurrentWorkout = (workout) => ({
    type: actionTypes.FINISH_CURRENT_WORKOUT,
    payload: workout
})

export const deletePastWorkout = (workout) => ({
    type: actionTypes.DELETE_PAST_WORKOUT,
    payload: workout
})

export const setCurrentProgram = (program) => ({
    type: actionTypes.SET_CURRENT_PROGRAM,
    payload: program
})

export const addPastProgram = (program) => ({
    type: actionTypes.ADD_PAST_PROGRAM,
    payload: program
})

export const deletePastProgram = (program) => ({
    type: actionTypes.DELETE_PAST_PROGRAM,
    payload: program
})

export const refreshAndSetData = () => ({
    type: actionTypes.REFRESH_AND_SET_DATA,
    payload: {}
})


