import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import NumericInput from './NumericInput'
import * as UIconstants from './UIconstants'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'
import DecimalInput from './DecimalInput'
import ChangeExerciseNameModal from './ChangeExerciseNameModal'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function Exercise({exercise, exerciseIndex, editable, handleAddSet, handleDeleteSet, handleDeleteExercise, handleUpdateSet, weekIndex, workoutIndex, changeExerciseName, exerciseNames, programView}) {

    const isDeleteSetDisabled = exercise.sets.length == 0

    return (
        <View style={styles.exercise}>

            <ChangeExerciseNameModal 
                exerciseNames={exerciseNames} 
                changeExerciseName={changeExerciseName} 
                programView={programView} 
                weekIndex={weekIndex}
                workoutIndex={workoutIndex}
                exerciseIndex={exerciseIndex}
                currentExerciseName={exercise.name}
                editable={editable}
            />    

            {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={styles.setInput}>
                    <Text>Set {setIndex + 1}: </Text>
                    {editable ? (
                        <>
                            <NumericInput value={set.reps} handleValueChange={(action, value) => handleUpdateSet(exerciseIndex, setIndex, UIconstants.SET_FIELD_REPS, action, value, weekIndex, workoutIndex)} />                        
                            <Text style={styles.normalText}> reps </Text>
                            <View style={[styles.normalText, { width: 30 }]} />                         
                            <DecimalInput value={set.weight} handleValueChange={(action, value) => handleUpdateSet(exerciseIndex, setIndex, UIconstants.SET_FIELD_WEIGHT, action, value, weekIndex, workoutIndex)} />
                            <Text style={styles.normalText}> kg</Text>
                        </>
                    ) : (
                        <Text style={[styles.normalText, { marginRight: 10 }]}>{set.reps} reps {set.weight} kg</Text>
                    )}
                </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                {editable && (
                    <>
                        <TouchableOpacity style={styles.mediumButton} onPress={() => handleAddSet(exerciseIndex, weekIndex, workoutIndex) }>
                            <Text style={styles.buttonText}>Add Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.mediumButton, isDeleteSetDisabled && { opacity: 0.5 }]} onPress={() => handleDeleteSet(exerciseIndex, weekIndex, workoutIndex) } disabled={isDeleteSetDisabled} >
                            <Text style={styles.buttonText}>Delete Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mediumButton} onPress={() => handleDeleteExercise(exerciseIndex, weekIndex, workoutIndex)}>
                            <Text style={styles.buttonText}>Del Exercise</Text>
                        </TouchableOpacity>
                    </>
                )}    
            </View>
        </View>
    )
}

export default Exercise