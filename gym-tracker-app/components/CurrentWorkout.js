import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Workout from './Workout'
import { useData } from '../context/DataContext'
import AppStyles from '../styles/AppStyles'

function CurrentWorkout() {

    const { state } = useData();
    const workout = state.currentWorkout

    return(
        workout ? (
            <Workout workout={workout} editable={true} />
        ):(
            <View style={[AppStyles.container, {padding: 15, alignItems: 'center'}]}>
                <Text style={{ marginBottom: 10 }}>No Active workout</Text>
                <TouchableOpacity style={AppStyles.largeButton} >
                    <Text style={AppStyles.buttonText}>Start Workout</Text>
                </TouchableOpacity>    
                <Text style={{ marginTop: 10 }}>or use past workout or program to start.</Text>                 
            </View>
        )
    )
}
export default CurrentWorkout