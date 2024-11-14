import * as actionTypes from './actionTypes'
import cloneDeep from 'lodash/cloneDeep'

export const initialState = {    
    currentWorkout: null,   
    pastWorkouts: [],
    currentProgram: null,   
    pastPrograms: [],
    exerciseNames: []
}

const dataReducer = (state = initialState, action) => {

    switch (action.type) {

    case actionTypes.SETUP_USER: {
        console.log('Setting up user')
        console.log(action.payload)
        const data = {
            ...state,  
            username: action.payload.username,
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
    case actionTypes.REFRESH_AND_SET_DATA: {
        const data = {...action.payload}
        return data
    }
    case actionTypes.SET_CURRENT_WORKOUT: {            
        console.log('Setting current workout');
        console.log('State before update:', state);
        console.log('Action payload:', action.payload);
        const x = {
            username: 'test22',
            token: 'test22',
            currentWorkout: null,
            pastWorkouts: [],
            currentProgram: null,
            pastPrograms: [],
            exerciseNames: []
        };
        console.log('Cloned state:', x);
        return x;
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