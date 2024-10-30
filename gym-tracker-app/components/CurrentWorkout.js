import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Workout from './Workout'
import { useData } from '../context/DataContext'
import AppStyles from '../styles/AppStyles'
import { setCurrentWorkout, finishCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'

function CurrentWorkout() {

    const { state, dispatch } = useData()
    const workout = state.currentWorkout
    const exerciseNames = state.exerciseNames
    const navigation = useNavigation()
  
    const saveWorkout = (exercises, notes) => {
        const workout = {...state.currentWorkout, exercises: exercises, notes: notes, saved: new Date()}
        dispatch(setCurrentWorkout(workout))
    }

    const finishWorkout = (exercises, notes) => {
        const workout = {...state.currentWorkout, exercises: exercises, notes: notes, saved: new Date()}
        dispatch(finishCurrentWorkout(workout))
        navigation.navigate('Past Workouts')
    }

    const handleStartWorkout = () => {
        const workout = {exercises: [], notes: '', created: new Date()}
        dispatch(setCurrentWorkout(workout))
    }


    return(
        workout ? (
            <Workout workout={workout} editable={true} programView={false} exerciseNames={exerciseNames} saveWorkout={saveWorkout} finishWorkout={finishWorkout} />
        ):(
            <View style={[AppStyles.container, {padding: 15, alignItems: 'center'}]}>
                <Text style={{ marginBottom: 10 }}>No active workout</Text>
                <TouchableOpacity style={AppStyles.largeButton} onPress={handleStartWorkout} >
                    <Text style={AppStyles.buttonText}>Start Workout</Text>
                </TouchableOpacity>    
                <Text style={{ marginTop: 10 }}>or use a past workout or program to start.</Text>                 
            </View>
        )
    )
}
export default CurrentWorkout