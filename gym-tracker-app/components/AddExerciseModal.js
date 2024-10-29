import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import AppStyles from '../styles/AppStyles'

const AddExerciseModal = ({exerciseNames, addExecise}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [exerciseName, setExerciseName] = useState('')

    const handleAddExercise = () => {
        setIsModalVisible(true)
    }

    const addNewExercise = (name) => {
        addExecise(name)
        setIsModalVisible(false) 
        setExerciseName('')
    }

    return (
        <View>

            <TouchableOpacity style={AppStyles.fixedButton} onPress={handleAddExercise}>
                <Text style={AppStyles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>     

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
                                    onPress={() => addNewExercise(exercise)}
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
                        <TouchableOpacity style={[AppStyles.largeButton, {marginVertical:3}]} disabled={!exerciseName.trim()} onPress={() => addNewExercise(exerciseName) }>
                            <Text style={AppStyles.buttonText}>Add exercise</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={AppStyles.largeButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={AppStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddExerciseModal    