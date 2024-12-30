import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import Program from './Program';
import {
    deletePastProgram,
    setCurrentWorkout,
    activateProgram,
} from '../reducers/dataActions';
import { useNavigation } from '@react-navigation/native';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

export default function CurrentProgram() {
    const [index, setIndex] = useState(0);
    const state = useSelector((state) => state.data);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const program =
        state.pastPrograms && state.pastPrograms.length > 0
            ? state.pastPrograms[index]
            : null;

    const handleNavigate = (direction) => {
        if (direction == 'previous') {
            setIndex(Math.min(index + 1, state.pastPrograms.length - 1));
        } else {
            setIndex(Math.max(index - 1, 0));
        }
    };

    const handleDelete = () => {
        dispatch(deletePastProgram(state.pastPrograms[index]));
        setIndex(Math.max(index - 1, 0));
    };

    const handleActivate = () => {
        const activatedProgram = state.pastPrograms[index];
        activatedProgram.created = new Date();
        activatedProgram.saved = new Date();
        const currentProgram = state.currentProgram;
        currentProgram.saved = new Date();
        dispatch(activateProgram(activatedProgram, currentProgram));
        navigation.navigate('Program');
    };

    const startWorkout = (workout) => {
        const newWorkout = cloneDeep(workout);
        newWorkout.created = new Date();
        newWorkout.saved = new Date();
        dispatch(setCurrentWorkout(newWorkout));
        navigation.navigate('Workout');
    };

    const isActionsDisabled = !program;
    const isNextDisabled =
        !state.pastPrograms || state.pastPrograms.length <= 0 || index <= 0;
    const isPreviousDisabled =
        !state ||
        state.pastPrograms.length <= 0 ||
        index >= state.pastPrograms.length - 1;

    return (
        <>
            <View
                style={[
                    styles.programHeader,
                    { marginBottom: 0, marginLeft: 2, marginRight: 2 },
                ]}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.smallButton,
                            isPreviousDisabled && { opacity: 0.5 },
                        ]}
                        onPress={() => handleNavigate('previous')}
                        disabled={isPreviousDisabled}
                    >
                        <Text style={styles.buttonText}>Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.smallButton,
                            isActionsDisabled && { opacity: 0.5 },
                        ]}
                        onPress={handleDelete}
                        disabled={isActionsDisabled}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.smallButton,
                            isActionsDisabled && { opacity: 0.5 },
                        ]}
                        onPress={handleActivate}
                        disabled={isActionsDisabled}
                    >
                        <Text style={styles.buttonText}>Activate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.smallButton,
                            isNextDisabled && { opacity: 0.5 },
                        ]}
                        onPress={() => handleNavigate('next')}
                        disabled={isNextDisabled}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {program ? (
                <View style={[styles.day, { flex: 1 }]}>
                    <Program
                        program={program}
                        editable={false}
                        programView={true}
                        startWorkout={startWorkout}
                    />
                </View>
            ) : (
                <View
                    style={[
                        styles.day,
                        {
                            padding: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            margin: 5,
                        },
                    ]}
                >
                    <Text>No past programs</Text>
                </View>
            )}
        </>
    );
}
