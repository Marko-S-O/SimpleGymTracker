import React, { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { DataProvider } from './context/DataContext'
import { setData, setupUser } from './reducers/dataActions'
import { readData, hasLocalData } from './services/dataService'
import store from './store/configureStore'
import SetupScreen from './components/SetupScreen'


function MainApp() {

    console.log('MainApp')

    const dispatch = useDispatch();
    const [isKnownUser, setIsKnownUser] = useState(false);

    // In the startup, get the data from the local storage. If data is found, get server data and merge with local.
    // If no local data is found, the program goes to the login screen. If there is server data with given username,
    // it is taken into use.
    useEffect(() => {
        console.log('MainApp useEffect')
        const readInitialData = async () => {
            const isLocalData = await hasLocalData();
            if (isLocalData) {
                setIsKnownUser(true);
                const data = await readData();
                dispatch(setData(data));
            } else {
                setIsKnownUser(false);
            }
        }
        readInitialData();
    }, [dispatch])

    const finalizeSetup = async (uname) => {
        console.log('Finalizing setup for ' + uname)
        dispatch(setupUser(uname))
        setIsKnownUser(true)
    }

    return (
        <NavigationContainer>
            {isKnownUser ? (
                <AppNavigator />
            ) : (
                <SetupScreen finalizeSetup={finalizeSetup} />
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