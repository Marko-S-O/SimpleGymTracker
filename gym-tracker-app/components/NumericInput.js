import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'

function NumericInput({ value, onChange, minValue = 0, step = 1 }) {

    const handleIncrement = () => {
        onChange(Math.max(minValue, value + step)); // Increase by step
    };

    const handleDecrement = () => {
        onChange(Math.max(minValue, value - step)); // Decrease by step but no lower than minValue
    };

    return (
        <View style={AppStyles.numericInputContainer}>
            <TouchableOpacity onPress={handleDecrement} style={AppStyles.incrementButton}>
                <Text style={AppStyles.incrementButtonText}>−</Text>
            </TouchableOpacity>

            <TextInput
                style={AppStyles.inputField}
                keyboardType="numeric"
                value={`${value}`}
                onChangeText={(text) => onChange(parseInt(text) || minValue)}
            />

            <TouchableOpacity onPress={handleIncrement} style={AppStyles.incrementButton}>
                <Text style={AppStyles.incrementButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NumericInput