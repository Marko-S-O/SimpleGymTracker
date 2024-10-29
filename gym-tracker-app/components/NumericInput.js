import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'
import * as setConstants from './setConstants'

function NumericInput({ value, handleValueChange }) {

    
    return (
        <View style={AppStyles.numericInputContainer}>
            <TouchableOpacity onPress={() => handleValueChange(setConstants.SET_FIELD_ACTION_DECREASE) } style={AppStyles.incrementButton}>
                <Text style={AppStyles.incrementButtonText}>−</Text>
            </TouchableOpacity>

            <TextInput
                style={AppStyles.inputField}
                keyboardType="numeric"
                value={`${value}`}
                onChangeText={(text) => handleValueChange(setConstants.SET_FIELD_ACTION_UPDATE, parseInt(text) || 0) }
            />

            <TouchableOpacity onPress={() => handleValueChange(setConstants.SET_FIELD_ACTION_INCREASE) } style={AppStyles.incrementButton}>
                <Text style={AppStyles.incrementButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NumericInput