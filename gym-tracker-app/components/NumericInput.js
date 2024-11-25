import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import * as UIconstants from './UIconstants'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function NumericInput({ value, handleValueChange }) {

    const [inputFieldValue, setInputFieldValue] = useState(value)

    const handleTextChange = (text) => {
        console.log('handleTextChange: ' + text)        
        const decimalText = text.replace(',', '.')
        setInputFieldValue(decimalText)
        const decimalValue = parseFloat(decimalText)
        if(decimalValue != NaN) {
            handleValueChange(UIconstants.SET_FIELD_ACTION_UPDATE, parseFloat(decimalValue) || 0);
        }
    }

    return (
        <View style={styles.numericInputContainer}>
            <TouchableOpacity onPress={() => handleValueChange(UIconstants.SET_FIELD_ACTION_DECREASE) } style={styles.incrementButton}>
                <Text style={styles.incrementButtonText}>−</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.inputField}
                keyboardType={Platform.OS === 'web' ? 'decimal' : 'numeric'}
                value={inputFieldValue}
                onChangeText={ handleTextChange }
            />

            <TouchableOpacity onPress={() => handleValueChange(UIconstants.SET_FIELD_ACTION_INCREASE) } style={styles.incrementButton}>
                <Text style={styles.incrementButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NumericInput