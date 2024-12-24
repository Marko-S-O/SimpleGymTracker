import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { setCurrentWorkout, deletePastWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'
import Workout from './Workout'
import ConfirmModal from './ConfirmModal'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function PastWorkouts() {

    const state = useSelector(state => state.data)
    if(!state.pastWorkouts) {
        return(<></>)
    }

    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    
    const [index, setIndex] = useState(0)
    const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false)    


    const workout = (state.pastWorkouts && (state.pastWorkouts.length >= index)) ? state.pastWorkouts[index] : null

    const handleNavigate = (direction) => {
        if(direction == 'previous') {
            setIndex(Math.min(index+1, state.pastWorkouts.length-1))
        } else {
            setIndex(Math.max(index-1, 0))
        }
    }

    handleCopyNew = () => {
        const newWorkout = {...state.pastWorkouts[index], created: new Date(), saved: null}
        dispatch(setCurrentWorkout(newWorkout))
        navigation.navigate('Workout')        
    }

    handleDelete = () => {
        dispatch(deletePastWorkout(state.pastWorkouts[index]))
        setIndex(Math.max(index-1, 0))
        setDeleteConfirmModalVisible(false)
    }
    
    const isDeleteDisabled = state.pastWorkouts.length == 0
    const isNewDisabled = state.pastWorkouts.length == 0 || state.setCurrentWorkout
    const isNextDisabled = index<=0 
    const isPreviousDisabled = index==(state.pastWorkouts.length-1) || state.pastWorkouts.length == 0

    return(
        <>
            <View style={[styles.WorkoutHeader, {marginLeft: 0, marginRight: 0, marginBottom: 0}]}>
                <Text style={[styles.boldText, {paddingLeft: 5}]}>My Past Workouts</Text>     
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.smallButton, isPreviousDisabled && { opacity: 0.5 }]} disabled={isPreviousDisabled} onPress={() => handleNavigate('previous')} >
                        <Text style={styles.buttonText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallButton, isNewDisabled && { opacity: 0.5 }]} disabled={isNewDisabled} onPress={() => handleCopyNew()} >
                        <Text style={styles.buttonText}>Copy New</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={[styles.smallButton, isDeleteDisabled && { opacity: 0.5 }]} disabled={isDeleteDisabled} onPress={() => setDeleteConfirmModalVisible(true)} >
                        <Text style={styles.buttonText}>Delete</Text>
                        <ConfirmModal
                                            visible={deleteConfirmModalVisible}
                                            onConfirm={() => handleDelete()}
                                            onRequestClose={() => setDeleteConfirmModalVisible(false) }
                                            header='Delete workout?'
                                            message='Confirm that you want to delete the workout.'
                                        />                                  
                    </TouchableOpacity>                        
                    <TouchableOpacity style={[styles.smallButton, isNextDisabled && { opacity: 0.5 }]} disabled={isNextDisabled} onPress={() => handleNavigate('next')} >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>                            
                </View> 
            </View>   
            { workout && (
                <Workout workout={workout} editable={false} programView={false} />
            )}
            { !workout && (            
                <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
                    <Text style={{ marginBottom: 10 }}>No past workouts</Text>                
                </View>            
            )}
        </>
    )
}
export default PastWorkouts