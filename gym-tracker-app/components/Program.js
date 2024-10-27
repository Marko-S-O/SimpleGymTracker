import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';
import Workout from './Workout';

function Program({ program, editable }) {
    //const [weeks, setWeeks] = useState(program.weeks || []);

    weeks = program.weeks

    const handleAddWeek = () => {
        console.log('add week');
    };

    const handleAddDay = (weekIndex) => {
        console.log('add day');
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
                {editable && (
                    <View style={AppStyles.historyNavigation}>
                        <Text style={AppStyles.programTitle}>Test Program </Text>
                        {editable && (
                            <>
                                <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddWeek}>
                                    <Text style={AppStyles.buttonText}>Add Week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddWeek}>
                                    <Text style={AppStyles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}

                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={AppStyles.week}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={AppStyles.boldText}>Week {week.weekNumber}</Text>
                            {editable && (
                                <TouchableOpacity style={AppStyles.smallButton} onPress={() => handleAddDay(weekIndex)}>
                                    <Text style={AppStyles.buttonText}>Add Day</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        
                        {week.days.map((day, dayIndex) => (
                            <View key={dayIndex} style={AppStyles.day}>
                                <Text style={AppStyles.boldText}>Day 1</Text>
                                {editable && (
                                    <TouchableOpacity style={AppStyles.smallButton} onPress={handleAddWeek}>
                                        <Text style={AppStyles.buttonText}>Add Week</Text>
                                    </TouchableOpacity>
                                )}
                                <Workout workout={day} editable={editable} />

                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Program;