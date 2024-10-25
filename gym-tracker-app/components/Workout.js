import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';
import Exercise from './Exercise';

function Workout() {
  
    let exercises = [
        { name: 'Jalkakyykky', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },        
        { name: 'Reisikoukistus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },              
        { name: 'Pohkeet jalkaprässissä', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                    
        { name: 'Penkkipunnerrus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },
        { name: 'Ylätalja', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                    
        { name: 'Olkapunnerrus käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                          
        { name: 'Hauiskääntö käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                
        { name: 'Vatsalihaspenkki', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                      
        { name: 'Selkäojennus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                            
        { name: 'Roikkuminen', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                                  
    ];
    let editable = true

    const [exerciseData, setExerciseData] = useState(exercises);

    const handleAddExercise = () => {
        setExerciseData([...exerciseData, { name: '', sets: [{ reps: 0, weight: 0 }] }]);
    };

    const handleSaveWorkout = () => {
        console.log('save workout...')
    };


    const updateSet = (exerciseIndex, setIndex, field, value) => {
        const newExercises = [...exerciseData];
        newExercises[exerciseIndex].sets[setIndex][field] = parseInt(value, 10);
        setExerciseData(newExercises);
    };

    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
                
                <View style={{ flex: 1 }}>                
                    {exerciseData.map((exercise, index) => (
                        <Exercise key={index} exercise={exercise} editable={editable} />
                    ))}
                    {editable && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddExercise}>
                                <Text style={AppStyles.buttonText}>Add Exercise</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AppStyles.smallButton} onPress={handleSaveWorkout}>
                                <Text style={AppStyles.buttonText}>Save Workout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    );
}

export default Workout;