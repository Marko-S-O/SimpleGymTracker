import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import * as UIconstants from './UIconstants';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

function DecimalInput({ value, handleValueChange }) {
    const [localValue, setLocalValue] = useState(`${value}`); // Local state to handle input

    const handleTextChange = (text) => {
        // Replace commas with dots to standardize decimal input
        const decimalText = text.replace(',', '.');

        // Allow empty or partial decimal input (e.g., ".", "1.", "1.5")
        if (/^\d*\.?\d*$/.test(decimalText)) {
            setLocalValue(decimalText); // Update local state
        }
    };

    const handleBlur = () => {
        // Format the value on blur (when user leaves the input field)
        const numericValue = parseFloat(localValue) || 0;
        setLocalValue(formatNumber(numericValue));
        handleValueChange(UIconstants.SET_FIELD_ACTION_UPDATE, numericValue);
    };

    const handleIncrement = (increment) => {
        const numericValue = parseFloat(localValue) || 0;
        const incrementedValue = numericValue + increment;
        setLocalValue(formatNumber(incrementedValue));
        handleValueChange(
            UIconstants.SET_FIELD_ACTION_UPDATE,
            incrementedValue
        );
    };

    const handleDecrement = (decrement) => {
        const numericValue = parseFloat(localValue) || 0;
        const decrementedValue =
            numericValue - decrement >= 0 ? numericValue - decrement : 0;
        setLocalValue(formatNumber(decrementedValue));
        handleValueChange(
            UIconstants.SET_FIELD_ACTION_UPDATE,
            decrementedValue
        );
    };

    const formatNumber = (number) => {
        return number % 1 === 0
            ? number.toString()
            : parseFloat(number.toFixed(10)).toString();
    };

    return (
        <View style={styles.numericInputContainer}>
            <TouchableOpacity
                onPress={() => handleDecrement(10)}
                style={styles.incrementButton}
            >
                <Text style={styles.incrementButtonText}>−</Text>
                <Text style={styles.incrementButtonText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDecrement(1)}
                style={styles.incrementButton}
            >
                <Text style={styles.incrementButtonText}>−</Text>
                <Text style={styles.incrementButtonText}>1</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.inputField}
                keyboardType={Platform.OS === 'web' ? 'decimal' : 'numeric'}
                value={localValue}
                onChangeText={handleTextChange}
                onBlur={handleBlur} // Format and update value on blur
            />

            <TouchableOpacity
                onPress={() => handleIncrement(1)}
                style={styles.incrementButton}
            >
                <Text style={styles.incrementButtonText}>+</Text>
                <Text style={styles.incrementButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleIncrement(10)}
                style={styles.incrementButton}
            >
                <Text style={styles.incrementButtonText}>+</Text>
                <Text style={styles.incrementButtonText}>10</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DecimalInput;
