import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Program from './Program'
import { addPastProgram, deletePastProgram, setCurrentProgram, setCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'

export default function CurrentProgram() {

    const [index, setIndex] = useState(0)
    const state = useSelector(state => state.data);  

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const program = state.pastPrograms?.[index] ?? null

    const handleNavigate = (direction) => {
        if(direction == 'previous') {
            setIndex(Math.min(index+1, state.pastPrograms.length-1))
        } else {
            setIndex(Math.max(index-1, 0))
        }
    }

    const handleDelete = () => {
        dispatch(deletePastProgram(state.pastPrograms[index]))
        setIndex(Math.max(index-1, 0))
    }

    const handleActivate = () => {
        dispatch(addPastProgram(state.CurrentProgram))
        dispatch(setCurrentProgram(state.pastPrograms[index]))
        navigation.navigate('Program')     
    }

    const startWorkout = (workout) => {
        dispatch(setCurrentWorkout(workout))
        navigation.navigate('Workout')
    }

    const isActionsDisabled = !program
    const isNextDisabled = !program?.pastPrograms || index <= 0
    const isPreviousDisabled = !program?.pastPrograms || (index >= pastPrograms.length-1)

    return (
        <>
        <View style={[AppStyles.programHeader, {marginBottom: 0, marginLeft: 3, marginRight: 3}]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                <TouchableOpacity style={[AppStyles.smallButton, isPreviousDisabled && { opacity: 0.5 }]} onPress={()=> handleNavigate('previous')} disabled={isPreviousDisabled} >
                    <Text style={AppStyles.buttonText}>Previous</Text>
                </TouchableOpacity>                          

                <TouchableOpacity style={[AppStyles.smallButton, isActionsDisabled && { opacity: 0.5 }]} onPress={handleDelete} disabled={isActionsDisabled} >
                    <Text style={AppStyles.buttonText}>Delete</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={[AppStyles.smallButton, isActionsDisabled && { opacity: 0.5 }]} onPress={handleActivate} disabled={isActionsDisabled} >
                    <Text style={AppStyles.buttonText}>Activate</Text>
                </TouchableOpacity>                            

                <TouchableOpacity style={[AppStyles.smallButton, isNextDisabled && { opacity: 0.5 }]} onPress={()=> handleNavigate('next')} disabled={isNextDisabled} >
                    <Text style={AppStyles.buttonText}>Next</Text>
                </TouchableOpacity>                  
            </View>
        </View>

        {program ? (
            <Program program={program} editable={false} programView={true} startWorkout={startWorkout} />
        ):(
            <View style={[AppStyles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
                <Text>No past programs</Text>
            </View>
        )}
        </>
    )
}