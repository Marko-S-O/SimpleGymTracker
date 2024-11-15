import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TouchableOpacity, View, Platform } from 'react-native'
import Program from './Program'
import {getEmptyProgram} from '../util/dataHelper'
import { setCurrentProgram, addPastProgram, setCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'
import cloneDeep from 'lodash/cloneDeep'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

export default function CurrentProgram() {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const state = useSelector(state => state.data)

    const program = state.currentProgram ? cloneDeep(state.currentProgram) : null
    
    const saveProgram = (weeks, name) => {
        const updatedWeeks = cloneDeep(weeks)
        const updatedProgram = {...program, weeks: updatedWeeks, name: name, saved: new Date()}
        dispatch(setCurrentProgram(updatedProgram))
    }

    const startProgram = () => {
        if(state.currentProgram) {
            const closedProgram = cloneDeep(state.currentProgram)
            closedProgram.saved = new Date()
            dispatch(addPastProgram(closedProgram))
        }
        const emptyProgram = getEmptyProgram()
        dispatch(setCurrentProgram(emptyProgram))
    }

    const startWorkout = (workout) => {
        const newWorkout = cloneDeep(workout)
        dispatch(setCurrentWorkout(newWorkout))
        navigation.navigate('Workout')
    }

    return (
        program ? (
            <View style={[styles.day, { flex: 1 }]}>
                <Program program={program} editable={true} programView={true} saveProgram={saveProgram} startProgram={startProgram} startWorkout={startWorkout} exerciseNames={state.exerciseNames} />
            </View>
        ):(
            <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', margin: 5}]}>
                <Text style={{ marginBottom: 10 }}>No active program</Text>
                <TouchableOpacity style={styles.largeButton} onPress={startProgram} >
                    <Text style={styles.buttonText}>Start Program</Text>
                </TouchableOpacity>                     
            </View>
        )
    )
}