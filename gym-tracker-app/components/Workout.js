import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AppStyles from '../styles/AppStyles';
import Exercise from './Exercise';

function Workout({workout, editable, programView=false}) {
  
    console.log(workout)

    const exercises = workout.exercises
    const workoutNotes = workout.workoutNotes
    const creationTime = workout.creationTime
    const saveTime = workout.saveTime

    const [exerciseData, setExerciseData] = useState(exercises);

    const handleAddExercise = () => {
        setExerciseData([...exerciseData, { name: '', sets: [{ reps: 0, weight: 0 }] }]);
    };

    const handleSaveWorkout = () => {
        console.log('save workout...')
    };

    const setWorkoutNotes = () => {
        console.log('setWorkoutNotes...')
    };    


    const updateSet = (exerciseIndex, setIndex, field, value) => {
        const newExercises = [...exerciseData];
        newExercises[exerciseIndex].sets[setIndex][field] = parseInt(value, 10);
        setExerciseData(newExercises);
    };

    const placeholderText = editable ? "  <Write additional workout notes here>" : ""
    const showButtons = editable && !programView

    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>

                <View style={AppStyles.infoTextContainer}>
                    <Text style={AppStyles.boldText}> Last saved: </Text>             
                    <Text style={AppStyles.normalText}> {saveTime} </Text>                                                        
                </View>                     

                <View style={{ flex: 1 }}>                
                    {exerciseData.map((exercise, index) => (
                        <Exercise key={index} exercise={exercise} editable={editable} />
                    ))}

                    <TextInput
                        style={[AppStyles.textInput, {borderColor: AppStyles.smallButton.backgroundColor, borderWidth: 1, borderRadius: 6}]}
                        placeholder={placeholderText}
                        value={workoutNotes}
                        onChangeText={setWorkoutNotes}
                        multiline
                        numberOfLines={3}
                        editable={editable}
                    />                        

                    {showButtons && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddExercise}>
                                <Text style={AppStyles.buttonText}>Add Exercise</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AppStyles.smallButton} onPress={handleSaveWorkout}>
                                <Text style={AppStyles.buttonText}>Save Program</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AppStyles.smallButton} onPress={handleSaveWorkout}>
                                <Text style={AppStyles.buttonText}>End Program</Text>
                            </TouchableOpacity>                            
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    );
}

export default Workout;