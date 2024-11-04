import * as actionTypes from './actionTypes'
import cloneDeep from 'lodash/cloneDeep'

export const initialState = {
    username: '',
    token: '',
    currentWorkout: null,   
    pastWorkouts: [],
    currentProgram: null,   
    pastPrograms: [],
    exerciseNames: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DATA: {
            data = {
                ...state,
                username: action.payload.data.username,
                token: action.payload.data.token,
                currentWorkout: action.payload.data.currentWorkout,
                pastWorkouts: action.payload.data.pastWorkouts,
                currentProgram: action.payload.data.currentProgram,
                pastPrograms: action.payload.data.pastPrograms,
                exerciseNames: action.payload.data.exerciseNames
            }
            return data
        }
        case actionTypes.SET_CURRENT_WORKOUT: {            
            data = {...state}
            data.currentWorkout = cloneDeep(action.payload)
            return data
        }

        case actionTypes.FINISH_CURRENT_WORKOUT: {
            data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts], currentWorkout: null} 
            return data           
        }
        
        case actionTypes.ADD_PAST_WORKOUT: {
            data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts]}
            return data      
        }

        case actionTypes.DELETE_PAST_WORKOUT: {
            data = {...state, pastWorkouts: state.pastWorkouts.filter(
                workout => workout.created !== action.payload.created)
            }
            return data      
        }

        case actionTypes.SET_CURRENT_PROGRAM: {
            data = {...state}
            data.currentProgram = cloneDeep(action.payload)
            return data
        }

        case actionTypes.ADD_PAST_PROGRAM: 
            return {
                ...state,
                pastPrograms: [action.payload, ...state.pastPrograms]
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