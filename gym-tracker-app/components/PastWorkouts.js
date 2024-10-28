import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Workout from './Workout'
import AppStyles from '../styles/AppStyles'
import { useData } from '../context/DataContext';

function PastWorkouts() {

    const { state } = useData()
    const workout = (state.pastWorkouts && (state.pastWorkouts.length > 0)) ? state.pastWorkouts[0] : null

    const navigate = (direction) => {
      //console.log('navigate ' + direction)
    }

    return(
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity style={AppStyles.smallButton} >
                <Text style={AppStyles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AppStyles.smallButton} >
                <Text style={AppStyles.buttonText}>Copy New</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={AppStyles.smallButton} >
                <Text style={AppStyles.buttonText}>Delete</Text>
            </TouchableOpacity>                        
            <TouchableOpacity style={AppStyles.smallButton} >
                <Text style={AppStyles.buttonText}>Next</Text>
            </TouchableOpacity>                            
        </View>    
        { workout && (
            <Workout workout={workout} editable={false} />
        )}
        { !workout && (
            <>
                <Text>No past workouts</Text>
            </>
        )}
      </>
    )
}
export default PastWorkouts