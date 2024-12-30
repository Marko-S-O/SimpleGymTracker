import * as actionTypes from './actionTypes';

export const setupUser = (data) => ({
    type: actionTypes.SETUP_USER,
    payload: { ...data },
});

export const setData = (data) => ({
    type: actionTypes.SET_DATA,
    payload: { ...data },
});

export const setCurrentWorkout = (workout) => ({
    type: actionTypes.SET_CURRENT_WORKOUT,
    payload: workout,
});

export const finishCurrentWorkout = (workout) => ({
    type: actionTypes.FINISH_CURRENT_WORKOUT,
    payload: workout,
});

export const deletePastWorkout = (workout) => ({
    type: actionTypes.DELETE_PAST_WORKOUT,
    payload: workout,
});

export const setCurrentProgram = (program) => ({
    type: actionTypes.SET_CURRENT_PROGRAM,
    payload: program,
});

export const addPastProgram = (program) => ({
    type: actionTypes.ADD_PAST_PROGRAM,
    payload: program,
});

export const deletePastProgram = (program) => ({
    type: actionTypes.DELETE_PAST_PROGRAM,
    payload: program,
});

export const refreshAndSetData = () => ({
    type: actionTypes.REFRESH_AND_SET_DATA,
    payload: {},
});

// When we activate an old program, we also need to move the current program to the past programs list.
// To do this safely, it needs to be done synchronously in the same action.
export const activateProgram = (activatedProgram, currentProgram) => ({
    type: actionTypes.ACTIVATE_PROGRAM,
    payload: {
        activatedProgram: activatedProgram,
        currentProgram: currentProgram,
    },
});
