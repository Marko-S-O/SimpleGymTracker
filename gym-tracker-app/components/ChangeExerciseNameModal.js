import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Platform } from 'react-native'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

// A dialog component to initialize an exercise. The name can be either chosen from the list
// that includes exercis from past workouts and programs, or type on new one.
const ChangeExerciseNameModal = ({exerciseNames, changeExerciseName, programView, weekIndex, workoutIndex, exerciseIndex, currentExerciseName, editable}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [exerciseName, setExerciseName] = useState('')

    const openDialog = () => {
        if(editable) {
            setIsModalVisible(true)
        }
    }

    const handleChange = (name, weekIndex, workoutIndex, exerciseIndex) => {
        changeExerciseName(name, weekIndex, workoutIndex, exerciseIndex)
        setIsModalVisible(false) 
        setExerciseName('')
    }

    return (
        <View>

            <Text style={styles.normalText} onPress={openDialog}>{currentExerciseName}</Text>                   

            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onShow={() => Keyboard.dismiss()}
                onRequestClose={() => setIsModalVisible(false)}                
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 300, padding: 20, paddingVertical: 8,  backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, marginBottom: 15 }}>Add Exercise</Text>

                        <ScrollView style={{ maxHeight: 250 }}>
                            {exerciseNames.map((exercise, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => handleChange(exercise, weekIndex, workoutIndex, exerciseIndex)}
                                    style={{ paddingVertical: 8 }}
                                >
                                    <Text style={{ fontSize: 15 }}>{exercise}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TextInput
                            placeholder="Type an exercise name"
                            value={exerciseName}
                            onChangeText={setExerciseName}
                            onBlur={()=>Keyboard.dismiss()}
                            style={{ borderColor: 'gray', borderWidth: 1, padding: 8, marginVertical: 10, borderRadius: 6 }}
                        />
                        <TouchableOpacity style={[styles.largeButton, {marginVertical:3}]} disabled={!exerciseName.trim()} onPress={() => handleChange(exerciseName, weekIndex, workoutIndex, exerciseIndex) }>
                            <Text style={styles.buttonText}>Change Name</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.largeButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ChangeExerciseNameModal