import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { Provider, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { DataProvider } from './context/DataContext'
import { setData, setupUser } from './reducers/dataActions'
import { readData, hasLocalData, setupSession } from './services/dataService'
import store from './store/configureStore'
import SetupScreen from './components/SetupScreen'

function MainApp() {

    const dispatch = useDispatch()
    const [isKnownUser, setIsKnownUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // In the startup, get the data from the local storage. If data is found, get server data and merge with local.
    // If no local data is found, the program goes to the login screen. If there is server data with given username,
    // it is taken into use.
    useEffect(() => {
        const readInitialData = async () => {
            const isLocalData = await hasLocalData();
            if (isLocalData) {
                setIsKnownUser(true);
                const data = await readData();
                dispatch(setData({...data}));
            } else {
                setIsKnownUser(false);
            }
        }
        readInitialData();
    }, [dispatch])

    const finalizeSetup = async (uid, password) => {

        const data = await setupSession(uid, password)

        if(data) {
            dispatch(setupUser(data))            
            setIsKnownUser(true)
            setErrorMessage('')
        } else {
            setErrorMessage('Setting up a user failed. Please check your password.')
        }
    }

    return (
        <NavigationContainer>
            {isKnownUser ? (
                <AppNavigator />
            ) : (
                <SetupScreen finalizeSetup={finalizeSetup} errorMessage={errorMessage} />
            )}
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <DataProvider>
                <MainApp />
            </DataProvider>
        </Provider>
    )
}