import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Program from './Program'
import { useData } from '../context/DataContext'
import { addPastProgram, deletePastProgram, setCurrentProgram, setCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'

export default function CurrentProgram() {

    const navigation = useNavigation()
    const { state, dispatch } = useData()

    const [index, setIndex] = useState(0)

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

    const program = (state.pastPrograms && (state.pastPrograms.length > 0)) ? state.pastPrograms[index] : null
    const isNextDisabled = index<=0 
    const isPreviousDisabled = index==(state.pastPrograms.length-1) || state.pastPrograms.length == 0

    return (
        <>
        <View style={[AppStyles.programHeader, {marginBottom: 0}]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <TouchableOpacity style={[AppStyles.smallButton, isPreviousDisabled && { opacity: 0.5 }]} onPress={()=> handleNavigate('previous')} >
                    <Text style={AppStyles.buttonText}>Previous</Text>
                </TouchableOpacity>                          

                <TouchableOpacity style={AppStyles.smallButton} onPress={handleDelete} >
                    <Text style={AppStyles.buttonText}>Delete</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={AppStyles.smallButton} onPress={handleActivate} >
                    <Text style={AppStyles.buttonText}>Activate</Text>
                </TouchableOpacity>                            

                <TouchableOpacity style={[AppStyles.smallButton, isNextDisabled && { opacity: 0.5 }]} onPress={()=> handleNavigate('next')} >
                    <Text style={AppStyles.buttonText}>Next</Text>
                </TouchableOpacity>                  
            </View>
        </View>

        {program ? (
            <Program program={program} editable={false} programView={true} startWorkout={startWorkout} />
        ):(
            <>
                <Text>No past programs</Text>
            </>
        )}
        </>
    )
}