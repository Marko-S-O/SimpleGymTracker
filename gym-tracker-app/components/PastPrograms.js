import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import Program from './Program'
import { useData } from '../context/DataContext'

export default function CurrentProgram() {

  return (<></>)

  const { state } = useData();
  const program = (state.pastPrograms && (state.pastPrograms.length > 0)) ? state.pastPrograms[0] : null

  const navigate = (direction) => {
      //console.log('navigate ' + direction)
  }

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <TouchableOpacity style={AppStyles.smallButton} >
              <Text style={AppStyles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={AppStyles.smallButton} >
              <Text style={AppStyles.buttonText}>Copy New</Text>
          </TouchableOpacity>      
          <TouchableOpacity style={AppStyles.smallButton} >
              <Text style={AppStyles.buttonText}>Delete</Text>
          </TouchableOpacity>                       
          <TouchableOpacity style={AppStyles.smallButton} >
              <Text style={AppStyles.buttonText}>Next</Text>
          </TouchableOpacity>                            
      </View>   
      program ? (
          <Program program={program} editable={false} programView={true} />
      ):(
          <>
              <Text>No past programs</Text>
          </>
        )

    </>
  )
}