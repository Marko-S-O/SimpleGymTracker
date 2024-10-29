import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Exercise from './Exercise'
import AddExerciseModal from './AddExerciseModal'
import * as setConstants from './setConstants'

function Workout({workout, editable, programView=false, exerciseNames=[]}) {
  
        if(!workout) {
        return(<></>)
    }

    const [exerecises, setExercises] = useState(workout.exercises)
    const [notes, setNotes] = useState(workout.notes)    

    const addExecise = (name) => {
        setExercises([...exerecises, { name: name, sets: [{ reps: setConstants.DEFAULT_REPS, weight: 0 }] }])
    }

    const handleSaveWorkout = () => {
        //console.log('save workout...')
    }

    const handleSetNotes = (text) => {
        console.log(text)
        setNotes(text)
    }    

    const getSetId = () => {
        return 1000
    }

    const handleAddSet = (exerciseId) => {
        console.log('handleAddSet: ' + exerciseId)

        const setId = getSetId()
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId ? {...exercise, sets: [...exercise.sets, { id: setId, reps: setConstants.DEFAULT_REPS, weight: 0 }]} : exercise
            )
        )
    }

    const handleDeleteSet = (exerciseId) => {
        console.log('handleDeleteSet: ' + exerciseId)
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId ? {...exercise, sets: [...exercise.sets.slice(0, -1)]} : exercise
            )
        )
    }

    const handleDeleteExercise = (exerciseId) => {
        console.log('handleDeleteExercise: ' + exerciseId)
        setExercises((prevExercises) =>
            prevExercises.filter((exercise) => exercise.id !== exerciseId)
        )
    }

    const updateSetValue = (set, field, action, value) => {

        if(field === setConstants.SET_FIELD_REPS) {
            if(action === setConstants.SET_FIELD_ACTION_DECREASE) {
                const reps = Math.max(1, set.reps-1)
                return { ...set, reps: reps }
            } else if(action === setConstants.SET_FIELD_ACTION_INCREASE) {
                return { ...set, reps: set.reps + 1 }
            } else {
                return { ...set, reps: value }
            }
        } else { // else == weight
            if(action === setConstants.SET_FIELD_ACTION_DECREASE) {
                let weight = set.weight
                if(weight >= 50 ) {
                    weight = weight - 10
                } else if (weight >= 30) {
                    weight = weight - 5
                } else {
                    weight = weight - 1
                }
                return { ...set, weight: Math.max(weight, 0) } // make 0 possible as a minimum to indicate using only own weight

            } else if(action === setConstants.SET_FIELD_ACTION_INCREASE) {
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

    const placeholderText = editable ? '  <Write additional workout notes here...>' : ''
    const showButtons = editable && !programView

    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>

                <View style={AppStyles.infoTextContainer}>
                    <Text style={AppStyles.boldText}> Last saved: </Text>             
                    <Text style={AppStyles.normalText}> {workout.saved} </Text>                                                        
                </View>                     

                <View style={{ flex: 1 }}>
                    {exerecises?.length > 0 && 
                        exerecises.map((exercise, index) => (
                           <Exercise key={index} exercise={exercise} editable={editable} handleAddSet={handleAddSet} handleDeleteSet={handleDeleteSet} handleDeleteExercise={handleDeleteExercise} handleUpdateSet={handleUpdateSet} />
                        ))
                    }

                    <TextInput
                        style={[AppStyles.textInput, {borderColor: 'gray', borderWidth: 1, borderRadius: 6, padding: 5}]}
                        placeholder={placeholderText}
                        value={notes}
                        onChangeText={handleSetNotes}
                        multiline
                        numberOfLines={3}
                        editable={editable}
                    />                        

                    {showButtons && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

                            <AddExerciseModal exerciseNames={exerciseNames} addExecise={addExecise} />    

                            <TouchableOpacity style={AppStyles.fixedButton} onPress={handleSaveWorkout}>
                                <Text style={AppStyles.buttonText}>Save Workout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AppStyles.fixedButton} onPress={handleSaveWorkout}>
                                <Text style={AppStyles.buttonText}>Finish Workout</Text>
                            </TouchableOpacity>     
                   
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default Workout