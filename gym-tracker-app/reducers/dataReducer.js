import * as actionTypes from './actionTypes'
import { saveData } from './services/dataService'

export const initialState = {
    username: '',
    token: '',
    currentWorkout: null,   
    pastWorkouts: [],
    currentProgram: null,   
    pastPrograms: [],
    exerciseNames: []
}

const storeData = () => {
    // TODO: change this to use asynchronous persistens later
    data = [...state]
    delete saveData.exerciseNames
    delete saveData.token
    saveData(data)
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
                exerciseNames: action.payload.data.exerciseNames
            }

        case actionTypes.SET_CURRENT_WORKOUT: {
            data = {...state, currentWorkout: action.payload}
            storeData(data)
            return data
        }
        case actionTypes.FINISH_CURRENT_WORKOUT: {
            data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts], currentWorkout: null} 
            storeData(data)
            return data           
        }
        
        case actionTypes.ADD_PAST_WORKOUT: {
            data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts]}
            storeData(data)
            return data      
        }

        case actionTypes.DELETE_PAST_WORKOUT: {
            data = {...state, pastWorkouts: state.pastWorkouts.filter(
                workout => workout.created !== action.payload.created)}
            storeData(data)
            return data      
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