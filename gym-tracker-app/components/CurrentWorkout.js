import React from 'react';
import Workout from './Workout';

function CurrentWorkout() {

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

    const workoutNotes = ''
    const creationTime = '12.09.1969 13:33'
    const saveTime = ''
    const workout = {
        exercises: exercises,
        workoutNotes: workoutNotes,
        creationTime: creationTime,
        saveTime: saveTime
    }

    return(
        <Workout workout={workout} editable={true} />
    )
}
export default CurrentWorkout