import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'

export default function SetupScreen({ finalizeSetup }) {

    const [username, setUsername] = useState('')

    const handleSetup = () => {
        console.log('handleLogin')
        if (username && username.length > 5) {
            finalizeSetup(username) // Call the callback with a 'true' value to indicate successful login
        }
    }

    return (
        <View style={[AppStyles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
            <Text style={[AppStyles.boldText, {marginBottom: 10}]}>
                Welcome to the SimpleGymTracker App!
            </Text>                
            <Text style={[AppStyles.normalText, {marginBottom: 10}]}>
                It looks like no existing data was found locally.
                Please enter your username if you already have one.
            </Text>
            <Text style={[AppStyles.normalText, {marginBottom: 10}]}>
                New user? Enter an account name you'd like to use.
            </Text>
            <Text style={[AppStyles.normalText, {marginBottom: 10}]}>            
                Note: Your account name is solely for identifying your data on the server. There are no passwords or logins required.                            
            </Text>
            <Text style={[AppStyles.normalText, {marginBottom: 10}]}>
                Username:
            </Text>
            <TextInput
                style={{width: 170, fontSize: 16, marginBottom: 10, borderColor: '#1F2937', borderWidth: 1, backgroundColor: '#F0F0F0'}}
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity style={AppStyles.largeButton} onPress={handleSetup} >
                <Text style={AppStyles.buttonText}>Start using</Text>
            </TouchableOpacity>  

        </View>
    )
}
