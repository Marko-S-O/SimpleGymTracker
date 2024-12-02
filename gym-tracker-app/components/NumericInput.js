import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import * as UIconstants from './UIconstants'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;


function NumericInput({ value, handleValueChange }) {
    
    return (
        <View style={styles.numericInputContainer}>
            <TouchableOpacity onPress={() => handleValueChange(UIconstants.SET_FIELD_ACTION_DECREASE) } style={styles.incrementButton}>
                <Text style={styles.incrementButtonText}>−</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                value={`${value}`}
                onChangeText={(text) => handleValueChange(UIconstants.SET_FIELD_ACTION_UPDATE, parseInt(text) || 0) }
            />

            <TouchableOpacity onPress={() => handleValueChange(UIconstants.SET_FIELD_ACTION_INCREASE) } style={styles.incrementButton}>
                <Text style={styles.incrementButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NumericInput