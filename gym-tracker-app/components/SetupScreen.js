import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

export default function SetupScreen({ finalizeSetup }) {

    const [uname, setUname] = useState('')

    const handleSetup = () => {
        if (uname && uname.length > 5) {
            finalizeSetup(uname)
        }
    }

    console.log('setup screen ' + uname)

    return (
        <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
            <Text style={[styles.boldText, {marginBottom: 10}]}>
                Welcome to the SimpleGymTracker App!
            </Text>                
            <Text style={[styles.normalText, {marginBottom: 10}]}>
                It looks like no existing data was found locally.
                Please enter your username if you already have one.
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10}]}>
                New user? Enter an account name you'd like to use.
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10}]}>            
                Note: Your account name is solely for identifying your data on the server. There are no passwords or logins required.                            
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10}]}>
                Username:
            </Text>
            <TextInput
                style={{width: 170, fontSize: 16, marginBottom: 10, borderColor: '#1F2937', borderWidth: 1, backgroundColor: '#F0F0F0'}}
                value={uname}
                onChangeText={setUname}
            />
            <TouchableOpacity style={styles.largeButton} onPress={handleSetup} >
                <Text style={styles.buttonText}>Start using</Text>
            </TouchableOpacity>  

        </View>
    )
}
