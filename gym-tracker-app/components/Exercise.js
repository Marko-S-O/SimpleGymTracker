import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';
import NumericInput from './NumericInput';

function Exercise({exercise, editable}) {
  
    const handleAddSet = () => {
        console.log('add set...')
    };

    const handleSetReps = () => {
        console.log('set reps...')
    };    

    return (

        <View style={AppStyles.exercise}>
            <Text style={AppStyles.boldText}>{exercise.name}</Text>      
            {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={AppStyles.setInput}>
                    <Text>Set {setIndex + 1}: </Text>
                    {editable ? (
                        <>
                            <NumericInput value={8} onChange={handleSetReps} minValue={1} step={1} />                        
                            <Text> reps </Text>
                            <View style={{ width: 30 }} />                         
                            <NumericInput value={0} onChange={handleSetReps} minValue={1} step={1} />
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
                        <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddSet}>
                            <Text style={AppStyles.buttonText}>Add Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddSet}>
                            <Text style={AppStyles.buttonText}>Delete Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddSet}>
                            <Text style={AppStyles.buttonText}>Del Exercise</Text>
                        </TouchableOpacity>
                    </>
                )}    
            </View>
        </View>
    )
}

export default Exercise;