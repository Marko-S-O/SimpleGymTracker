import { clone } from 'lodash'
import * as actionTypes from './actionTypes'
import cloneDeep from 'lodash/cloneDeep'

export const initialState = {    
    userId: null,
    currentWorkout: null,   
    pastWorkouts: [],
    currentProgram: null,   
    pastPrograms: [],
    exerciseNames: []
}

const dataReducer = (state = initialState, action) => {

    switch (action.type) {

    case actionTypes.SETUP_USER: {

        console.log('SET_DATA')
        console.log('state before')
        console.log(state)
        console.log('payload')
        console.log(action.payload)

        const data = {
            ...state,  
            userId: action.payload.userId,
            token: action.payload.token,
            currentWorkout: action.payload.currentWorkout,
            pastWorkouts: action.payload.pastWorkouts,
            currentProgram: action.payload.currentProgram,
            pastPrograms: action.payload.pastPrograms,
            exerciseNames: action.payload.exerciseNames
        }
        return data;
    }

    case actionTypes.SET_DATA: {
        const data = {
            ...state,
            userId: action.payload.userId,
            token: action.payload.token,
            currentWorkout: action.payload.currentWorkout,
            pastWorkouts: action.payload.pastWorkouts,
            currentProgram: action.payload.currentProgram,
            pastPrograms: action.payload.pastPrograms,
            exerciseNames: action.payload.exerciseNames
        }
        return data
    }
    case actionTypes.REFRESH_AND_SET_DATA: {
        // Actual work for this action is done in middleware
        const data = {...action.payload}
        return data
    }
    case actionTypes.SET_CURRENT_WORKOUT: {       
        const data = cloneDeep(state)
        data.currentWorkout = action.payload
        return data
    }

    case actionTypes.FINISH_CURRENT_WORKOUT: {
        const data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts], currentWorkout: null} 
        return data           
    }
    
    case actionTypes.ADD_PAST_WORKOUT: {
        const data = {...state, pastWorkouts: [action.payload, ...state.pastWorkouts]}
        return data      
    }

    case actionTypes.DELETE_PAST_WORKOUT: {
        const data = {...state, pastWorkouts: state.pastWorkouts.filter(
            workout => workout.created !== action.payload.created)
        }
        return data      
    }

    case actionTypes.SET_CURRENT_PROGRAM: {                                                                                                                                                                                                                                    
        const data = {...state}
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