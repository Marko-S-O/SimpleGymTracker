import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Workout from './Workout'
import { TextInput } from 'react-native'
import * as UIconstants from './UIconstants'
import { getEmptyWorkout } from '../util/dataHelper'

function Program({ program, editable, saveProgram, startProgram, startWorkout, exerciseNames }) {

    if(!program) {
        return(<></>)
    }

    const [weeks, setWeeks] = useState(program.weeks || [])
    const [name, setName] = useState(program.name || '')

    useEffect(() => {
        setWeeks(program.weeks || [])
        setName(program.name || '')
    }, [program])

    const scrollViewRef = useRef(null)

    const handleAddWeek = () => {
        const workout = {exercises: [], notes: ''}
        const week = {
            workouts: [workout]
        }
        setWeeks([...weeks, week])
    }

    const handleDeleteWeek = (weekIndex) => {
        const updatedWeeks = [
            ...weeks.slice(0, weekIndex),
            ...weeks.slice(weekIndex + 1),
        ]
        setWeeks(updatedWeeks)
    }

    const handleAddWorkout = (weekIndex) => {
        const weekToUpdate = {...weeks[weekIndex]}
        weekToUpdate.workouts.push(getEmptyWorkout())
        const updatedWeeks = [...weeks].map((week, index) => 
            index == weekIndex ? weekToUpdate : week
        )
        setWeeks(updatedWeeks)
    }

    const handleDeleteWorkout = (weekIndex, workoutIndex) => {

        const weekToUpdate = {...weeks[weekIndex]}
        const updatedWorkouts = [
            ...weekToUpdate.workouts.slice(0, workoutIndex),
            ...weekToUpdate.workouts.slice(workoutIndex + 1)
        ]
        weekToUpdate.workouts = updatedWorkouts
        updatedWeeks = [...weeks].map((week, index) => 
            index == weekIndex ? weekToUpdate : week
        )
        setWeeks(updatedWeeks)
    }

    const handleSaveProgram = () => {
        console.log(handleSaveProgram)
        console.log(weeks)
        saveProgram(weeks, name)
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }        
    }

    const handleStartWorkout = (weekIndex, workoutIndex) => {
        const workout = weeks[weekIndex].workouts[workoutIndex]
        workout.created = new Date()
        startWorkout(workout)
    }

    // Update program data when an individual set or exercise has been updated in the Workout component
    const updateProgramWorkout = (workout, weekIndex, workoutIndex) => {
        
        const updatedWeeks = [...weeks]
        updatedWeeks[weekIndex].workouts[workoutIndex] = workout
        setWeeks(updatedWeeks)

    }

    const handleSetName = (text) => {
        console.log('handleSetName: ' + text)
        setName(text)
    }    

    return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1, padding: 8 }}>

                {editable ? ( 
                    <View style={AppStyles.programHeader}>
                        <Text style={AppStyles.boldText}>Active Program</Text>                        
                        <View style={[AppStyles.programHeader, {flexDirection: 'row'}]}>
                            <Text style={[AppStyles.normalText, {fontSize: 16, verticalAlign: 'middle', marginBottom:6, paddingRight: 10}]}>Name: </Text>
                            <TextInput
                                style={{borderColor: 'gray', borderWidth: 1, borderRadius: 6, padding: 5, marginBottom: 6, fontWeight: 'normal', fontSize: 16}}
                                placeholder={'<Program Name>'}
                                value={name}
                                onChangeText={handleSetName}
                                multiline
                                numberOfLines={1}
                                editable={editable}
                            />
                        </View>
                        <View style={[AppStyles.programHeader, {flexDirection: 'row'}]} >
                                <TouchableOpacity style={AppStyles.mediumButton} onPress={handleAddWeek} >
                                    <Text style={AppStyles.buttonText}>Add Week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.mediumButton} onPress={handleSaveProgram} >
                                    <Text style={AppStyles.buttonText}>Save Program</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.mediumButton} onPress={startProgram} >
                                    <Text style={AppStyles.buttonText}>Start New</Text>
                                </TouchableOpacity>                                
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={AppStyles.boldText}>Saved: </Text>    
                            { program.saved && (
                                <Text style={AppStyles.normalText}> {program.saved.toLocaleDateString(UIconstants.UI_LOCALE, UIconstants.UI_DATE_TIME_FORMAT)} </Text>
                            )}                        
                        </View>    
                    </View>                                           
                ) : (
                    <View style={[AppStyles.programHeader, {marginBottom:0}]}>
                        <Text style={AppStyles.programTitle}>{program.name}</Text>
                    </View>                    
                 
                )}                    
                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={AppStyles.week}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 8, paddingRight: 20 }}>
                            <Text style={AppStyles.boldText}>Week {weekIndex+1}</Text>
                            {editable && (
                                <>
                                <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleAddWorkout(weekIndex)}>
                                    <Text style={AppStyles.buttonText}>Add Workout</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleDeleteWeek(weekIndex)}>
                                    <Text style={AppStyles.buttonText}>Delete Week</Text>
                                </TouchableOpacity>                                
                                </>         
                            )}
                        </View>
                        
                        {week.workouts.map((workout, workoutIndex) => (
                            <View key={workoutIndex} style={AppStyles.day}>
                                <View style={{flexDirection: 'row', padding: 5}}>
                                    <Text style={AppStyles.boldText}>Workout {workoutIndex + 1} </Text>
                                    {editable && (
                                        <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleDeleteWorkout(weekIndex, workoutIndex)}>
                                            <Text style={AppStyles.buttonText}>Delete</Text>
                                        </TouchableOpacity>                                
                                    )}
                                    <TouchableOpacity style={AppStyles.mediumButton} onPress={() => handleStartWorkout(weekIndex, workoutIndex)}>
                                        <Text style={AppStyles.buttonText}>Start →</Text>
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
    )
}

export default Program