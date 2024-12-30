import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Workout from './Workout';
import { TextInput } from 'react-native';
import * as UIconstants from './UIconstants';
import { getEmptyWorkout } from '../util/dataHelper';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function Program({
    program,
    editable,
    saveProgram,
    startProgram,
    startWorkout,
    exerciseNames,
}) {
    const [weeks, setWeeks] = useState(program.weeks || []);
    const [name, setName] = useState(program.name || '');

    useEffect(() => {
        setWeeks(program.weeks || []);
        setName(program.name || '');
    }, [program]);

    const scrollViewRef = useRef(null);

    const handleAddWeek = () => {
        const workout = { exercises: [], notes: '' };
        const week = {
            workouts: [workout],
        };
        setWeeks([...weeks, week]);
    };

    const handleDeleteWeek = (weekIndex) => {
        const updatedWeeks = [
            ...weeks.slice(0, weekIndex),
            ...weeks.slice(weekIndex + 1),
        ];
        setWeeks(updatedWeeks);
    };

    const handleAddWorkout = (weekIndex) => {
        const weekToUpdate = { ...weeks[weekIndex] };
        weekToUpdate.workouts.push(getEmptyWorkout());
        const updatedWeeks = [...weeks].map((week, index) =>
            index == weekIndex ? weekToUpdate : week
        );
        setWeeks(updatedWeeks);
    };

    const handleDeleteWorkout = (weekIndex, workoutIndex) => {
        const weekToUpdate = { ...weeks[weekIndex] };
        const updatedWorkouts = [
            ...weekToUpdate.workouts.slice(0, workoutIndex),
            ...weekToUpdate.workouts.slice(workoutIndex + 1),
        ];
        weekToUpdate.workouts = updatedWorkouts;
        const updatedWeeks = [...weeks].map((week, index) =>
            index == weekIndex ? weekToUpdate : week
        );
        setWeeks(updatedWeeks);
    };

    const handleSaveProgram = () => {
        saveProgram(weeks, name);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleStartWorkout = (weekIndex, workoutIndex) => {
        const workout = weeks[weekIndex].workouts[workoutIndex];
        //workout.created = new Date()
        startWorkout(workout);
    };

    // Update program data when an individual set or exercise has been updated in a Workout component that is used by this one
    const updateProgramWorkout = (workout, weekIndex, workoutIndex) => {
        const updatedWeeks = [...weeks];
        updatedWeeks[weekIndex].workouts[workoutIndex] = workout;
        setWeeks(updatedWeeks);
    };

    const handleSetName = (text) => {
        setName(text);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} style={{ flexGrow: 1, padding: 8 }}>
                {editable ? (
                    <View style={styles.programHeader}>
                        <Text style={styles.boldText}>Active Program</Text>
                        <View
                            style={[
                                styles.programHeader,
                                { flexDirection: 'row' },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.normalText,
                                    {
                                        verticalAlign: 'middle',
                                        marginBottom: 0,
                                        marginTop: 3,
                                        paddingRight: 3,
                                    },
                                ]}
                            >
                                Name:{' '}
                            </Text>
                            <TextInput
                                style={{
                                    borderColor: 'gray',
                                    backgroundColor: styles.day.backgroundColor,
                                    borderRadius: 6,
                                    padding: 5,
                                    marginBottom: 0,
                                    marginTop: 5,
                                    fontWeight: 'normal',
                                    width: 210,
                                    height: 25,
                                    fontSize: 14,
                                }}
                                value={name}
                                onChangeText={handleSetName}
                                multiline
                                numberOfLines={1}
                                editable={editable}
                            />
                        </View>
                        <View
                            style={[
                                styles.programHeader,
                                { flexDirection: 'row' },
                            ]}
                        >
                            <TouchableOpacity
                                style={styles.mediumButton}
                                onPress={handleAddWeek}
                            >
                                <Text style={styles.buttonText}>Add Week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.mediumButton}
                                onPress={handleSaveProgram}
                            >
                                <Text style={styles.buttonText}>
                                    Save Program
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.mediumButton}
                                onPress={startProgram}
                            >
                                <Text style={styles.buttonText}>Start New</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.boldText}>Saved: </Text>
                            {program.saved && (
                                <Text style={styles.normalText}>
                                    {' '}
                                    {program.saved.toLocaleDateString(
                                        UIconstants.UI_LOCALE,
                                        UIconstants.UI_DATE_TIME_FORMAT
                                    )}{' '}
                                </Text>
                            )}
                        </View>
                    </View>
                ) : (
                    <View
                        style={[
                            styles.programHeader,
                            { marginBottom: 0, flexDirection: 'row' },
                        ]}
                    >
                        <Text style={styles.boldText}>{program.name}:</Text>
                        <Text style={styles.normalText}>
                            {' '}
                            {program.created.toLocaleDateString(
                                UIconstants.UI_LOCALE,
                                UIconstants.UI_DATE_FORMAT
                            )}{' '}
                            -{' '}
                            {program.saved.toLocaleDateString(
                                UIconstants.UI_LOCALE,
                                UIconstants.UI_DATE_FORMAT
                            )}
                        </Text>
                    </View>
                )}
                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.week}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginBottom: 8,
                                paddingRight: 20,
                            }}
                        >
                            <Text style={styles.boldText}>
                                Week {weekIndex + 1}
                            </Text>
                            {editable && (
                                <>
                                    <TouchableOpacity
                                        style={styles.mediumButton}
                                        onPress={() =>
                                            handleAddWorkout(weekIndex)
                                        }
                                    >
                                        <Text style={styles.buttonText}>
                                            Add Workout
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mediumButton}
                                        onPress={() =>
                                            handleDeleteWeek(weekIndex)
                                        }
                                    >
                                        <Text style={styles.buttonText}>
                                            Delete Week
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                        {week.workouts.map((workout, workoutIndex) => (
                            <View key={workoutIndex} style={styles.day}>
                                <View
                                    style={{ flexDirection: 'row', padding: 5 }}
                                >
                                    <Text style={styles.boldText}>
                                        Workout {workoutIndex + 1}{' '}
                                    </Text>
                                    {editable && (
                                        <TouchableOpacity
                                            style={styles.mediumButton}
                                            onPress={() =>
                                                handleDeleteWorkout(
                                                    weekIndex,
                                                    workoutIndex
                                                )
                                            }
                                        >
                                            <Text style={styles.buttonText}>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={styles.mediumButton}
                                        onPress={() =>
                                            handleStartWorkout(
                                                weekIndex,
                                                workoutIndex
                                            )
                                        }
                                    >
                                        <Text style={styles.buttonText}>
                                            Start →
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Workout
                                    workout={workout}
                                    editable={editable}
                                    programView={true}
                                    exerciseNames={exerciseNames}
                                    weekIndex={weekIndex}
                                    workoutIndex={workoutIndex}
                                    updateProgramWorkout={updateProgramWorkout}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Program;
