import * as actionTypes from './actionTypes'

export const initialState = {
    username: '',
    token: '',
    currentWorkout: null,   
    pastWorkouts: [],
    currentProgram: null,   
    pastPrograms: [],
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DATA: 
            return {
                ...state,
                username: action.payload.data.username,
                token: action.payload.data.token,
                currentWorkout: action.payload.data.currentWorkout,
                pastWorkouts: action.payload.data.pastWorkouts,
                currentProgram: action.payload.data.currentProgram,
                pastPrograms: action.payload.data.pastPrograms,

            }

        case actionTypes.SET_CURRENT_WORKOUT: 
            return {
                ...state,
                currentWorkout: action.payload   
            }

        case actionTypes.UPDATE_CURRENT_WORKOUT: 
            return {
                ...state,
                currentWorkout: {
                    ...state.currentWorkout,
                    ...action.payload,  
                }
            }

        case actionTypes.ADD_PAST_WORKOUT:
            return {
                ...state,
                pastWorkouts: [...state.pastWorkouts, action.payload]
            }

        case actionTypes.DELETE_PAST_WORKOUT:
            return {
                ...state,
                pastWorkouts: state.pastWorkouts.filter(
                    workout => workout.created !== action.payload.created
                )
            }

        case actionTypes.SET_CURRENT_PROGRAM:
            return {
                ...state,
                currentProgram: action.payload   
            }

        case actionTypes.ADD_PAST_PROGRAM: 
            return {
                ...state,
                pastPrograms: [...state.pastPrograms, action.payload]
            }

        case actionTypes.DELETE_PAST_PROGRAM:
            return {
                ...state,
                pastPrograms: state.pastPrograms.filter(
                    program => program.created !== action.payload.created
                )
            }

        default:
            return state
    }
}

export default dataReducer