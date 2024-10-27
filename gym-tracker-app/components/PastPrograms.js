import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';
import Program from './Program';

export default function CurrentProgram() {

  const exercises = [
    { name: 'Jalkakyykky', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },        
    { name: 'Reisikoukistus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },              
    { name: 'Pohkeet jalkaprässissä', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                    
    { name: 'Penkkipunnerrus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },
    { name: 'Ylätalja', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                    
    { name: 'Olkapunnerrus käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                          
    { name: 'Hauiskääntö käsipainoilla', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                
    { name: 'Vatsalihaspenkki', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                      
    { name: 'Selkäojennus', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                            
    { name: 'Roikkuminen', sets: [{ reps: 8, weight: 60 }, { reps: 6, weight: 70 }] },                                                  
];

    const program = {
      weeks: [ 
        {name: 'week 1',
          days: [
            {name: 'day 1', exercises: exercises}
          ]
        }      
      ]  
    }

  const navigate = (direction) => {
      console.log('navigate ' + direction)
  }

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
              <Text style={AppStyles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
              <Text style={AppStyles.buttonText}>Copy New</Text>
          </TouchableOpacity>      
          <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('previous')}>
              <Text style={AppStyles.buttonText}>Delete</Text>
          </TouchableOpacity>                       
          <TouchableOpacity style={AppStyles.smallButton} onPress={navigate('next')}>
              <Text style={AppStyles.buttonText}>Next</Text>
          </TouchableOpacity>                            
      </View>   
      <Program program={program} editable={false} programView={true} />
    </>
  )
}