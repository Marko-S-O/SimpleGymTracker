import React from 'react'
import { Text } from 'react-native'
import Program from './Program'
import { useData } from '../context/DataContext'
import { getEmptyProgram } from './util/dataHelper'
import { setCurrentProgram, addPastProgram, setCurrentWorkout } from '../reducers/dataActions'
import { useNavigation } from '@react-navigation/native'

export default function CurrentProgram() {

  const { state, dispatch } = useData()
  const navigation = useNavigation()
  const program = state.currentProgram
  
  const exerciseNames = state.exerciseNames

  const saveProgram = (weeks) => {
    const workout = {...state.currentProgram, weeks: weeks, saved: new Date()}
    dispatch(setCurrentProgram(workout))
  }

  const startProgram = () => {
    closedProgram = {...state.currentProgram}
    dispatch(addPastProgram(closedProgram))
    dispatch(setCurrentProgram(getEmptyProgram()))
  }

  const startWorkout = (workout) => {
    dispatch(setCurrentWorkout(workout))
    navigation.navigate('Workout')
  }

  return (
    program ? (
      <Program program={program} editable={true} programView={true} saveProgram={saveProgram} startProgram={startProgram} startWorkout={startWorkout} />
    ):(
      <>
          <Text>No current Program.</Text>
      </>
    )
  )
}