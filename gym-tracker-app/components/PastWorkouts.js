import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import Workout from './Workout'
import { setCurrentWorkout, deletePastWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function PastWorkouts() {

    const state = useSelector(state => state.data)
    if(!state.pastWorkouts) {
        return(<></>)
    }

    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    
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
    
    const isDeleteDisabled = state.pastWorkouts.length == 0
    const isNewDisabled = state.currentWorkout && (state.currentWorkout.exercises.length > 0)
    const isNextDisabled = index<=0 
    const isPreviousDisabled = index==(state.pastWorkouts.length-1) || state.pastWorkouts.length == 0

    return(
        <>
            <View style={[styles.WorkoutHeader, {marginLeft: 4, marginRight: 4, marginBottom: 0}]}>
                <Text style={[styles.boldText, {paddingLeft: 5}]}>My Past Workouts</Text>     
                <View style={[styles.WorkoutHeader, { flexDirection: 'row', justifyContent: 'space-between', marginLeft: 4, marginRight: 4, marginBottom: 0}]}>
                    <TouchableOpacity style={[styles.smallButton, isPreviousDisabled && { opacity: 0.5 }]} disabled={isPreviousDisabled} onPress={() => handleNavigate('previous')} >
                        <Text style={styles.buttonText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallButton, isNewDisabled && { opacity: 0.5 }]} disabled={isNewDisabled} onPress={() => handleCopyNew()} >
                        <Text style={styles.buttonText}>Copy New</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={[styles.smallButton, isDeleteDisabled && { opacity: 0.5 }]} disabled={isDeleteDisabled} onPress={() => handleDelete()} >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>                        
                    <TouchableOpacity style={[styles.smallButton, isNextDisabled && { opacity: 0.5 }]} disabled={isNextDisabled} onPress={() => handleNavigate('next')} >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>                            
                </View> 
            </View>   
            { workout && (
                <Workout workout={workout} editable={false} programView={false} />
            )}
            { !workout && (            
                <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
                    <Text style={{ marginBottom: 10 }}>No past workouts</Text>                
                    {isNewDisabled ? (
                        <Text style={{ marginTop: 10 }}>You have an ongoing active workout.</Text>  
                    ):(
                        <>
                            <TouchableOpacity style={styles.largeButton} onPress={handleStartWorkout} >
                                <Text style={styles.buttonText}>Start Workout</Text>
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