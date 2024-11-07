import * as actionTypes from './actionTypes'

/*
export const SET_DATA = 'SET_DATA' // set initial data (from server)
export const SET_CURRENT_WORKOUT = 'SET_CURRENT_WORKOUT' // sets the current active workout (from create new or copy from a program or past workout)
export const UPDATE_CURRENT_WORKOUT = 'UPDATE_CURRENT_WORKOUT' // updates the current active workout
export const ADD_PAST_WORKOUT = 'ADD_PAST_WORKOUT' // adds a workout to workout history (finish workout button)
export const DELETE_PAST_WORKOUT = 'DELETE_PAST_WORKOUT' // deletes a workout from workout history
export const SET_CURRENT_PROGRAM = 'SET_CURRENT_PROGRAM' // sets the current active program (create new or copy from a past program)
export const UPDATE_CURRENT_PROGRAM = 'UPDATE_CURRENT_PROGRAM' // update the active program
export const ADD_PAST_PROGRAM = 'ADD_PAST_PROGRAM' // add a program to the program history
export const DELETE_PAST_PROGRAM = 'DELETE_PAST_PROGRAM' // deletes a past program from program history
*/

export const setData = (data) => ({
    type: actionTypes.SET_DATA,
    payload: { data }
});

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


