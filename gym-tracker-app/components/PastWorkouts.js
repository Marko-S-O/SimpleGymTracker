import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Workout from './Workout';
import AppStyles from '../styles/AppStyles';

function PastWorkouts() {

    const exercises = [
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

    const workoutNotes = 'This is a non-editable test workout'
    const creationTime = '12.09.1969 13:33'
    const saveTime = '12.09.2024 23:59'

    const workout = {
        exercises: exercises,
        workoutNotes: workoutNotes,
        creationTime: creationTime,
        saveTime: saveTime
    }

    const navigate = (direction) => {
      console.log('navigate ' + direction)
  }

    return(
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
                <Text style={AppStyles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
                <Text style={AppStyles.buttonText}>Copy New</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
                <Text style={AppStyles.buttonText}>Delete</Text>
            </TouchableOpacity>                        
            <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('next')}>
                <Text style={AppStyles.buttonText}>Next</Text>
            </TouchableOpacity>                            
        </View>              
        <Workout workout={workout} editable={false} />
      </>
    )
}
export default PastWorkouts