import React from 'react'
import { Text } from 'react-native'
import Program from './Program'
import { useData } from '../context/DataContext'

export default function CurrentProgram() {

  return (<></>)
  
  const { state } = useData()
  const program = state.CurrentProgram

  return (
    program ? (
      <Program program={program} editable={true} programView={true} />
    ):(
      <>
          <Text>No current Program.</Text>
      </>
    )
  )
}