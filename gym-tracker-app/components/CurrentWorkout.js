import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TouchableOpacity, View, Platform } from 'react-native'
import Workout from './Workout'
import { setCurrentWorkout, finishCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'
import cloneDeep from 'lodash/cloneDeep'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function CurrentWorkout() {

    const state = useSelector(state => state.data);
    const workout = state.currentWorkout ? cloneDeep(state.currentWorkout) : null

    const dispatch = useDispatch()
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
        const workout = {...state.currentWorkout, exercises: [], notes: '', created: new Date()}
        dispatch(setCurrentWorkout(workout))
    }

    return(
        workout ? (
            <Workout workout={workout} editable={true} programView={false} exerciseNames={state.exerciseNames} saveWorkout={saveWorkout} finishWorkout={finishWorkout} />
        ):(
            <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>

                <Text style={{ marginBottom: 10 }}>No active workout</Text>
                <TouchableOpacity style={styles.largeButton} onPress={handleStartWorkout} >
                    <Text style={styles.buttonText}>Start Workout</Text>
                </TouchableOpacity>    
                <Text style={{ marginTop: 10 }}>or use a past workout or program to start.</Text>                 
            </View>
        )
    )
}
export default CurrentWorkout