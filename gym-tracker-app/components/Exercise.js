import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    PanResponder,
} from 'react-native';
import NumericInput from './NumericInput';
import * as UIconstants from './UIconstants';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';
import DecimalInput from './DecimalInput';
import ChangeExerciseNameModal from './ChangeExerciseNameModal';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function Exercise({
    exercise,
    exerciseIndex,
    editable,
    handleAddSet,
    handleDeleteSet,
    handleDeleteExercise,
    handleUpdateSet,
    weekIndex,
    workoutIndex,
    changeExerciseName,
    exerciseNames,
    programView,
    moveExercise,
    setScrollEnabled,
}) {
    const [reorderMode, setReorderMode] = useState(false);

    const swapExercises = (direction) => {
        moveExercise(exerciseIndex, direction);
        setReorderMode(false);
        setScrollEnabled(true);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < -20) {
                    swapExercises(-1);
                } else if (gestureState.dy > 20) {
                    swapExercises(1);
                }
            },
            onPanResponderRelease: () => {
                setReorderMode(false);
                setScrollEnabled(true);
            },
        })
    ).current;

    if (!exercise) {
        return null;
    }

    const onLongPress = (e) => {
        e.stopPropagation();
        setReorderMode(true);
        setScrollEnabled(false);
    };

    const isDeleteSetDisabled = exercise && exercise.sets.length == 0;

    return (
        <View {...(reorderMode ? panResponder.panHandlers : {})}>
            <TouchableOpacity
                style={[
                    { marginBottom: 0, padding: 0 },
                    reorderMode ? { opacity: 0.8 } : {},
                ]}
                onLongPress={onLongPress} // Attach the long press handler
                pointerEvents={reorderMode ? 'box-none' : 'auto'}
            >
                <View style={styles.exercise}>
                    <ChangeExerciseNameModal
                        exerciseNames={exerciseNames}
                        changeExerciseName={changeExerciseName}
                        programView={programView}
                        weekIndex={weekIndex}
                        workoutIndex={workoutIndex}
                        exerciseIndex={exerciseIndex}
                        currentExerciseName={exercise.name}
                        editable={editable}
                    />

                    {exercise.sets.map((set, setIndex) => (
                        <View key={setIndex} style={styles.setInput}>
                            <Text>Set {setIndex + 1} </Text>
                            {editable ? (
                                <>
                                    <NumericInput
                                        value={set.reps}
                                        handleValueChange={(action, value) =>
                                            handleUpdateSet(
                                                exerciseIndex,
                                                setIndex,
                                                UIconstants.SET_FIELD_REPS,
                                                action,
                                                value,
                                                weekIndex,
                                                workoutIndex
                                            )
                                        }
                                    />
                                    <Text style={styles.normalText}>*</Text>
                                    <View style={styles.normalText} />
                                    <DecimalInput
                                        value={set.weight}
                                        handleValueChange={(action, value) =>
                                            handleUpdateSet(
                                                exerciseIndex,
                                                setIndex,
                                                UIconstants.SET_FIELD_WEIGHT,
                                                action,
                                                value,
                                                weekIndex,
                                                workoutIndex
                                            )
                                        }
                                    />
                                    <Text style={styles.normalText}>kg</Text>
                                </>
                            ) : (
                                <Text
                                    style={[
                                        styles.normalText,
                                        { marginRight: 10 },
                                    ]}
                                >
                                    {set.reps} reps {set.weight} kg
                                </Text>
                            )}
                        </View>
                    ))}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}
                    >
                        {editable && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.mediumButton}
                                    onPress={() =>
                                        handleAddSet(
                                            exerciseIndex,
                                            weekIndex,
                                            workoutIndex
                                        )
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Add Set
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.mediumButton,
                                        isDeleteSetDisabled && { opacity: 0.5 },
                                    ]}
                                    onPress={() =>
                                        handleDeleteSet(
                                            exerciseIndex,
                                            weekIndex,
                                            workoutIndex
                                        )
                                    }
                                    disabled={isDeleteSetDisabled}
                                >
                                    <Text style={styles.buttonText}>
                                        Delete Set
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.mediumButton}
                                    onPress={() =>
                                        handleDeleteExercise(
                                            exerciseIndex,
                                            weekIndex,
                                            workoutIndex
                                        )
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Del Exercise
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Exercise;
