import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Exercise from './Exercise'
import AddExerciseModal from './AddExerciseModal'
import * as UIconstants from './UIconstants'

function Workout({workout, editable, programView, exerciseNames=[], saveWorkout, finishWorkout}) {

    if(!workout) {
        return(<></>)
    }

    const [exercises, setExercises] = useState(workout.exercises)
    const [notes, setNotes] = useState(workout.notes)    

    useEffect(() => {
        setExercises(workout.exercises || [])
        setNotes(workout.notes || '')
    }, [workout])

    const scrollViewRef = useRef(null)

    const addExecise = (name) => {
        setExercises([...exercises, { name: name, sets: [{ reps: UIconstants.DEFAULT_REPS, weight: 0 }] }])
    }

    const handleSaveWorkout = () => {
        saveWorkout(exercises, notes)
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }        
    }

    const handleFinishWorkout = () => {
        finishWorkout(exercises, notes)
    }    

    const handleSetNotes = (text) => {
        setNotes(text)
    }    

    const getSetId = () => {
        return 1000
    }

    const handleAddSet = (exerciseId) => {

        const setId = getSetId()
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId ? {...exercise, sets: [...exercise.sets, { id: setId, reps: UIconstants.DEFAULT_REPS, weight: 0 }]} : exercise
            )
        )
    }

    const handleDeleteSet = (exerciseId) => {

        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId ? {...exercise, sets: [...exercise.sets.slice(0, -1)]} : exercise
            )
        )
    }

    const handleDeleteExercise = (exerciseId) => {

        setExercises((prevExercises) =>
            prevExercises.filter((exercise) => exercise.id !== exerciseId)
        )
    }

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

    const handleUpdateSet = (exerciseId, setId, field, action, value) => {

        setExercises((prevExercises) => 
            prevExercises.map((exercise) => 
                exercise.id === exerciseId ? {
                    ...exercise,
                    sets: exercise.sets.map((set) => 
                        set.id === setId ? updateSetValue(set, field, action, value) : set
                    ),
                } : exercise
            )
        )
    }

    return (
        <View style={[AppStyles.day, { flex: 1 }]}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1, padding: 5 }}>

                {(editable && !programView) && (
                    <View style={AppStyles.WorkoutHeader}>
                        <Text style={[AppStyles.boldText, {paddingLeft: 5}]}>Workout Tracker</Text>     
                        <View style={[AppStyles.WorkoutHeader, {flexDirection: 'row'}]}>
                            <Text style={AppStyles.normalText}>Saved: </Text>      
                            { workout.saved && (
                                <Text style={AppStyles.normalText}> {workout.saved.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                            )}
                        </View>                    
                    </View>
                )}

                {(!editable && !programView) && (
                    <View style={[AppStyles.WorkoutHeader, {flexDirection: 'row'}]}>
                        <Text style={AppStyles.boldText}> Created: </Text>             
                        <Text style={AppStyles.normalText}> {workout.created.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                        <Text style={AppStyles.boldText}> Finished: </Text>             
                        <Text style={AppStyles.normalText}> {workout.saved.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>                                                        
                    </View>                    
                )}

                <View style={{ flex: 1 }}>
                    {exercises?.length > 0 && 
                        exercises.map((exercise, index) => (
                           <Exercise key={index} exercise={exercise} editable={editable} handleAddSet={handleAddSet} handleDeleteSet={handleDeleteSet} handleDeleteExercise={handleDeleteExercise} handleUpdateSet={handleUpdateSet} />
                        ))
                    }
                    <TextInput
                        style={{borderColor: 'gray', borderWidth: 1, borderRadius: 6, padding: 5}}
                        placeholder={editable? '  <Write additional workout notes here...>' : ''}
                        value={notes}
                        onChangeText={handleSetNotes}
                        multiline
                        numberOfLines={programView ? 1 : 2}
                        editable={editable}
                    />                        
                    {editable && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

                            <AddExerciseModal exerciseNames={exerciseNames} addExecise={addExecise} programView={programView} />    

                            {!programView && (
                                <>
                                    <TouchableOpacity style={AppStyles.fixedButton} onPress={handleSaveWorkout}>
                                        <Text style={AppStyles.buttonText}>Save Workout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={AppStyles.fixedButton} onPress={handleFinishWorkout}>
                                        <Text style={AppStyles.buttonText}>Finish Workout</Text>
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