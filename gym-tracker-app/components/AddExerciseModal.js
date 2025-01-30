import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    ScrollView,
    Keyboard,
    Platform,
} from 'react-native';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

// A dialog component to initialize an exercise. The name can be either chosen from the list
// that includes exercis from past workouts and programs, or type on new one.
const AddExerciseModal = ({
    exerciseNames,
    addExecise,
    programView,
    weekIndex,
    workoutIndex,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [exerciseName, setExerciseName] = useState('');

    const handleAddExercise = () => {
        setIsModalVisible(true);
    };

    const addNewExercise = (name, weekIndex, workoutIndex) => {
        addExecise(name, weekIndex, workoutIndex);
        setIsModalVisible(false);
        setExerciseName('');
    };

    return (
        <>
            <TouchableOpacity
                style={programView ? styles.mediumButton : styles.fixedButton}
                onPress={handleAddExercise}
            >
                <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onShow={() => Keyboard.dismiss()}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 300,
                            padding: 20,
                            paddingVertical: 8,
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 15 }}>
                            Add Exercise
                        </Text>

                        <ScrollView style={{ maxHeight: 280 }}>
                            {exerciseNames.map(
                                (exercise, index) =>
                                    (exerciseName.length == 0 ||
                                        exercise.indexOf(exerciseName) !=
                                            -1) && (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                addNewExercise(
                                                    exercise,
                                                    weekIndex,
                                                    workoutIndex
                                                )
                                            }
                                            style={{ paddingVertical: 8 }}
                                        >
                                            <Text style={{ fontSize: 15 }}>
                                                {exercise}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            )}
                        </ScrollView>

                        <TextInput
                            placeholder="Type an exercise name"
                            value={exerciseName}
                            onChangeText={setExerciseName}
                            onBlur={() => Keyboard.dismiss()}
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                padding: 8,
                                marginVertical: 10,
                                borderRadius: 6,
                            }}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.largeButton}
                                disabled={!exerciseName.trim()}
                                onPress={() =>
                                    addNewExercise(
                                        exerciseName,
                                        weekIndex,
                                        workoutIndex
                                    )
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Add exercise
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.largeButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default AddExerciseModal;
