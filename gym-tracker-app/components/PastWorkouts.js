import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Workout from './Workout'
import AppStyles from '../styles/AppStyles'
import { useData } from '../context/DataContext'
import { setCurrentWorkout, deletePastWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'

function PastWorkouts() {

    const navigation = useNavigation()
    const { state, dispatch } = useData()
    const [index, setIndex] = useState(0)
    const workout = (state.pastWorkouts && (state.pastWorkouts.length >= index)) ? state.pastWorkouts[index] : null

    const handleStartWorkout = () => {
        const workout = {exercises: [], notes: '', created: new Date()}
        dispatch(setCurrentWorkout(workout))
        navigation.navigate('Workout')              
    }

    const handleNavigate = (direction) => {
        if(direction == 'previous') {
            setIndex(Math.min(index+1, state.pastWorkouts.length-1))
        } else {
            setIndex(Math.max(index-1, 0))
        }
    }

    handleCopyNew = () => {
        const newWorkout = {...state.pastWorkouts[index], created: new Date(), saved: null}
        dispatch(setCurrentWorkout(newWorkout))
        navigation.navigate('Workout')        
    }

    handleDelete = () => {
        dispatch(deletePastWorkout(state.pastWorkouts[index]))
        setIndex(Math.max(index-1, 0))
    }

    
    isDeleteDisabled = state.pastWorkouts.length == 0
    isNewDisabled = state.currentWorkout && (state.currentWorkout.exercises.length > 0)
    isNextDisabled = index<=0 
    isPreviousDisabled = index==(state.pastWorkouts.length-1) || state.pastWorkouts.length == 0

    console.log("isNewDisabled: " + isNewDisabled)

    return(
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity style={[AppStyles.smallButton, isPreviousDisabled && { opacity: 0.5 }]} disabled={isPreviousDisabled} onPress={() => handleNavigate('previous')} >
                <Text style={AppStyles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.smallButton, isNewDisabled && { opacity: 0.5 }]} disabled={isNewDisabled} onPress={() => handleCopyNew()} >
                <Text style={AppStyles.buttonText}>Copy New</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={[AppStyles.smallButton, isDeleteDisabled && { opacity: 0.5 }]} disabled={isDeleteDisabled} onPress={() => handleDelete()} >
                <Text style={AppStyles.buttonText}>Delete</Text>
            </TouchableOpacity>                        
            <TouchableOpacity style={[AppStyles.smallButton, isNextDisabled && { opacity: 0.5 }]} disabled={isNextDisabled} onPress={() => handleNavigate('next')} >
                <Text style={AppStyles.buttonText}>Next</Text>
            </TouchableOpacity>                            
        </View>    
        { workout && (
            <Workout workout={workout} editable={false} />
        )}
        { !workout && (            
            <View style={[AppStyles.container, {padding: 15, alignItems: 'center'}]}>
                <Text style={{ marginBottom: 10 }}>No past workouts</Text>                
                {isNewDisabled ? (
                    <Text style={{ marginTop: 10 }}>You have an ongoing active workout.</Text>  
                ):(
                    <>
                    <TouchableOpacity style={AppStyles.largeButton} onPress={handleStartWorkout} >
                        <Text style={AppStyles.buttonText}>Start Workout</Text>
                    </TouchableOpacity>    
                    <Text style={{ marginTop: 10 }}>or use a  program to start one.</Text>  
                    </>                    

                )}
            </View>
            
        )}
      </>
    )
}
export default PastWorkouts