import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

export default function SetupScreen({ finalizeSetup, errorMessage }) {

    const [uid, setUid] = useState('')
    const [password, setPassword] = useState('')

    const handleSetup = () => {
        finalizeSetup(uid, password)
    }

    return (
        <View style={[styles.day, {padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1, margin: 5}]}>
            <Text style={[styles.boldText, {marginBottom: 10}]}>
                Welcome to the SimpleGymTracker App!
            </Text>                
            <Text style={[styles.normalText, {marginBottom: 10}]}>
                It looks like no existing data was found in your device.
                Please enter your username and password.
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10}]}>
                New user? Enter the account name and password you would like to use.
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10}]}>            
                Minimum lenght for account name is 6 and password 8 characters. 
                Lost account name or password can't be recovered when changing to a new device.
            </Text>
            <Text style={[styles.normalText, {marginBottom: 10, fontStyle: 'italic'}]}>            
                Important: never include any personal or sensitive data in your account name or data you feed into the system! 
            </Text>
            
            <View style={{flexDirection: 'row', marginTop: 15}}>
                <Text style={[styles.normalText, {marginBottom: 10}]}>Username: </Text>
                <TextInput
                    style={{width: 170, fontSize: 16, marginBottom: 10, borderColor: '#1F2937', borderWidth: 1, backgroundColor: '#F0F0F0'}}
                    value={uid}
                    onChangeText={setUid}
                />
            </View>
            <View style={{flexDirection: 'row', marginBottom: 8}}>
                <Text style={[styles.normalText, {marginBottom: 10}]}> Password: </Text>
                <TextInput
                    style={{width: 170, fontSize: 16, marginBottom: 10, borderColor: '#1F2937', borderWidth: 1, backgroundColor: '#F0F0F0'}}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity style={styles.largeButton} onPress={handleSetup} >
                <Text style={styles.buttonText}>Start using</Text>
            </TouchableOpacity>  

            <Text style={ [styles.normalText, {color: 'red'}] }> {errorMessage} </Text>
        </View>
    )
}
