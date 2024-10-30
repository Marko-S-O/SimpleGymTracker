import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import NumericInput from './NumericInput'
import * as UIconstants from './UIconstants'

function Exercise({exercise, editable, handleAddSet, handleDeleteSet, handleDeleteExercise, handleUpdateSet}) {

    return (

        <View style={AppStyles.exercise}>
            <Text style={AppStyles.boldText}>{exercise.name}</Text>      

            {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={AppStyles.setInput}>
                    <Text>Set {setIndex + 1}: </Text>
                    {editable ? (
                        <>
                            <NumericInput value={set.reps} handleValueChange={(action, value) => handleUpdateSet(exercise.id, set.id, UIconstants.SET_FIELD_REPS, action, value)} />                        
                            <Text> reps </Text>
                            <View style={{ width: 30 }} />                         
                            <NumericInput value={set.weight} handleValueChange={(action, value) => handleUpdateSet(exercise.id, set.id, UIconstants.SET_FIELD_WEIGHT, action, value)} />
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
                        <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleAddSet(exercise.id) }>
                            <Text style={AppStyles.buttonText}>Add Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleDeleteSet(exercise.id) }>
                            <Text style={AppStyles.buttonText}>Delete Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleDeleteExercise(exercise.id)}>
                            <Text style={AppStyles.buttonText}>Del Exercise</Text>
                        </TouchableOpacity>
                    </>
                )}    
            </View>
        </View>
    )
}

export default Exercise