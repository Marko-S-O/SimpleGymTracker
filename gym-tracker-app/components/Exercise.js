import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import NumericInput from './NumericInput'
import * as UIconstants from './UIconstants'

function Exercise({exercise, exerciseIndex, editable, handleAddSet, handleDeleteSet, handleDeleteExercise, handleUpdateSet, weekIndex, workoutIndex}) {

    const isDeleteSetDisabled = exercise.sets.length == 0

    return (
        <View style={AppStyles.exercise}>
            <Text style={AppStyles.normalText}>{exercise.name}</Text>      

            {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={AppStyles.setInput}>
                    <Text>Set {setIndex + 1}: </Text>
                    {editable ? (
                        <>
                        <NumericInput value={set.reps} handleValueChange={(action, value) => handleUpdateSet(exerciseIndex, setIndex, UIconstants.SET_FIELD_REPS, action, value, weekIndex, workoutIndex)} />                        
                        <Text> reps </Text>
                        <View style={{ width: 30 }} />                         
                        <NumericInput value={set.weight} handleValueChange={(action, value) => handleUpdateSet(exerciseIndex, setIndex, UIconstants.SET_FIELD_WEIGHT, action, value, weekIndex, workoutIndex)} />
                        <Text> kg</Text>
                        </>
                    ) : (
                        <Text style={{ marginRight: 10 }}>{set.reps} reps {set.weight} kg</Text>
                    )}
                </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                {editable && (
                    <>
                    <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleAddSet(exerciseIndex, weekIndex, workoutIndex) }>
                        <Text style={AppStyles.buttonText}>Add Set</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[AppStyles.mediumButton, isDeleteSetDisabled && { opacity: 0.5 }]} onPress={() => handleDeleteSet(exerciseIndex, weekIndex, workoutIndex) } disabled={isDeleteSetDisabled} >
                        <Text style={AppStyles.buttonText}>Delete Set</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleDeleteExercise(exerciseIndex, weekIndex, workoutIndex)}>
                        <Text style={AppStyles.buttonText}>Del Exercise</Text>
                    </TouchableOpacity>
                    </>
                )}    
            </View>
        </View>
    )
}

export default Exercise