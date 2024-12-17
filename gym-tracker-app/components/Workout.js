import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native'
import Exercise from './Exercise'
import AddExerciseModal from './AddExerciseModal'
import ConfirmModal from './ConfirmModal'
import * as UIconstants from './UIconstants'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

// Workout is the core component of the app used across all the tabs. 
// It provides most of the rendering and editing functionality across all tabs.
function Workout({workout, editable, programView, exerciseNames=[], saveWorkout, finishWorkout, weekIndex, workoutIndex, updateProgramWorkout}) {

    if(!workout) {
        return(<></>)
    }


    // The state of workout is maintained in the internal state of Workout.
    // Updating the global state with every update would be too heavy.
    // Global state is updated only when the user saves the data either in workout tracking or program editing.
    const [exercises, setExercises] = useState(workout.exercises)
    const [notes, setNotes] = useState(workout.notes)    
    const [finishConfirmModalVisible, setFinishConfirmModalVisible] = useState(false)
    const scrollViewRef = useRef(null)

    useEffect(() => {
        setExercises(workout.exercises || [])
        setNotes(workout.notes || '')
        if(Platform.OS == 'web') {
            if (scrollViewRef.current) {
                scrollViewRef.current.style.overflowY = 'scroll';
            }
        }
    }, [workout])


    const changeExerciseName = (newExerciseName, weekIndex, workoutIndex, exerciseIndex) => {

        const updatedExercises = exercises.map((exercise, iExercise) => 
            iExercise == exerciseIndex ? {
                ...exercise,
                name: newExerciseName
            } : exercise
        )
        setExercises(updatedExercises)

        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }
    }

    // If we are in the program view, also the internal state of program needs to be updated
    // when set or exercise data changes. This does not trigger global state and persistence update.
    const handleProgramUpdate = (exercises, notes, weekIndex, workoutIndex) => {
        const updatedWorkout = {
            exercises: [...exercises],
            notes: notes
        }
        updateProgramWorkout(updatedWorkout, weekIndex, workoutIndex)
    }

    const addExecise = (name, weekIndex, workoutIndex) => {
        const updatedExercises = [...exercises, { name: name, sets: [{ reps: UIconstants.DEFAULT_REPS, weight: 0 }] }]
        setExercises(updatedExercises)
        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }
    }

    const handleSaveWorkout = () => {
        saveWorkout(exercises, notes)
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }        
    }

    const handleFinishWorkout = () => {
        finishWorkout(exercises, notes)
        setFinishConfirmModalVisible(false)
    }    

    const handleSetNotes = (text, weekIndex, workoutIndex) => {
        setNotes(text)
        if(programView) {
            handleProgramUpdate(exercises, text, weekIndex, workoutIndex)
        }        
    }    

    const getNewSet = (exercise) => {
        if(exercise.sets.length > 0) {
            previousSet = exercise.sets[exercise.sets.length-1]
            return {reps: previousSet.reps, weight: previousSet.weight}
        } else {
            return {reps: UIconstants.DEFAULT_REPS, weight: 0}
            
        }

    }

    const handleAddSet = (exerciseIndex, weekIndex, workoutIndex) => {

        const updatedExercises = exercises.map((exercise, iExercise) => 
            iExercise == exerciseIndex
                ? { ...exercise, sets: [...exercise.sets, getNewSet(exercise)] }
                : exercise
        )

        setExercises(updatedExercises)
        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }
    }

    const handleDeleteSet = (exerciseIndex, weekIndex, workoutIndex) => {

        const updatedExercises = (prevExercises) =>
            prevExercises.map((exercise, iExercise) =>
                iExercise === exerciseIndex ? {...exercise, sets: [...exercise.sets.slice(0, -1)]} : exercise
            )
        setExercises(updatedExercises)
        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }        

    }

    const handleDeleteExercise = (exerciseIndex, weekIndex, workoutIndex) => {
        const updatedExercises = exercises.filter((exercise, iExercise) => iExercise !== exerciseIndex)
        setExercises(updatedExercises)

        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }        

    }

    // Utility method to update set values. Does not manipulate the state.
    // Internal workout state is updated in handleUpdateSet.
    const updateSetValue = (set, field, action, value) => {

        if(field === UIconstants.SET_FIELD_REPS) {
            if(action === UIconstants.SET_FIELD_ACTION_DECREASE) {
                const reps = Math.max(1, set.reps-1)
                return { ...set, reps: reps }
            } else if(action === UIconstants.SET_FIELD_ACTION_INCREASE) {
                return { ...set, reps: set.reps + 1 }
            } else {
                return { ...set, reps: value }
            }
        } else { // else == weight
            if(action === UIconstants.SET_FIELD_ACTION_DECREASE) {
                let weight = set.weight
                if(weight >= 50 ) {
                    weight = weight - 10
                } else if (weight >= 30) {
                    weight = weight - 5
                } else {
                    weight = weight - 1
                }
                return { ...set, weight: Math.max(weight, 0) } // make 0 possible as a minimum to indicate using only own weight

            } else if(action === UIconstants.SET_FIELD_ACTION_INCREASE) {
                let weight = set.weight
                if(weight >= 50 ) {
                    weight = weight + 10
                } else if (weight >= 30) {
                    weight = weight + 5
                } else {
                    weight = weight + 1
                }                
                return { ...set, weight: weight }
            } else {
                return { ...set, weight: value }
            }
        }
    }

    const handleUpdateSet = (exerciseIndex, setIndex, field, action, value) => {

        const updatedExercises = exercises.map((exercise, iExercise) => 
            iExercise == exerciseIndex ? {
                ...exercise,
                sets: exercise.sets.map((set, iSet) => 
                    iSet == setIndex ? updateSetValue(set, field, action, value) : set
                ),
            } : exercise
        )
        setExercises(updatedExercises)

        // In program view, the internal state of Program component needs to be updated as well
        if(programView) {
            handleProgramUpdate(updatedExercises, notes, weekIndex, workoutIndex)
        }
    }

    return (
        <View style={[styles.day, { flex: 1, overflow: 'hidden' }]}>
            
            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1, overflow: 'visible' }}
                keyboardShouldPersistTaps="handled"
            >
                {(editable && !programView) && (
                    <View style={styles.WorkoutHeader}>
                        <Text style={[styles.boldText, {paddingLeft: 5}]}>Active Workout</Text>     
                        <View style={[styles.WorkoutHeader, {flexDirection: 'row'}]}>
                            <Text style={styles.normalText}>Saved: </Text>      
                            { workout.saved && (
                                <Text style={styles.normalText}> {workout.saved.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                            )}
                        </View>                    
                    </View>
                )}

                {(!editable && !programView) && (
                    <View style={[styles.WorkoutHeader, {flexDirection: 'row', padding: 1}]}>
                        <Text style={styles.boldText}> Start: </Text>             
                        <Text style={styles.normalText}> {workout.created.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                        <Text style={styles.boldText}> Finish: </Text>             
                        <Text style={styles.normalText}> {workout.saved.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                    </View>                    
                )}

                <View>
                    {exercises.length > 0 && 
                        exercises.map((exercise, exerciseIndex) => (
                            <Exercise 
                                key={exerciseIndex} 
                                exercise={exercise} 
                                exerciseIndex={exerciseIndex} 
                                editable={editable} 
                                handleAddSet={handleAddSet} 
                                handleDeleteSet={handleDeleteSet} 
                                handleDeleteExercise={handleDeleteExercise} 
                                handleUpdateSet={handleUpdateSet} 
                                weekIndex={weekIndex}
                                workoutIndex={workoutIndex}
                                changeExerciseName={changeExerciseName}
                                exerciseNames={exerciseNames}
                                programView={programView}
                            />
                        ))
                    }
                    <TextInput
                        style={styles.WorkoutNotes}
                        value={notes}
                        onChangeText={handleSetNotes}
                        multiline
                        numberOfLines={programView ? 1 : 2}
                        editable={editable}
                    />                        
                    {editable && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

                            <AddExerciseModal 
                                exerciseNames={exerciseNames} 
                                addExecise={addExecise} 
                                programView={programView} 
                                weekIndex={weekIndex}
                                workoutIndex={workoutIndex}
                            />    

                            {!programView && (
                                <>
                                    <TouchableOpacity style={styles.fixedButton} onPress={handleSaveWorkout}>
                                        <Text style={styles.buttonText}>Save Workout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.fixedButton} onPress={()=>setFinishConfirmModalVisible(true)}>
                                        <Text style={styles.buttonText}>Finish Workout</Text>
                                        <ConfirmModal
                                            visible={finishConfirmModalVisible}
                                            onConfirm={handleFinishWorkout}
                                            onRequestClose={() => setFinishConfirmModalVisible(false) }
                                            header='Finish workout?'
                                            message='Confirm that you want to finish the workout.'
                                        />                                         
                                    </TouchableOpacity>     
                                </>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default Workout