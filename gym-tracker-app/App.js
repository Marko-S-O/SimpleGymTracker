import React, { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { DataProvider } from './context/DataContext'
import { setData } from './reducers/dataActions'
import { readData, hasLocalData, readDataServer } from './services/dataService'
import store from './store/configureStore'
import SetupScreen from './components/SetupScreen'
import { getEmptyData } from './util/dataHelper'

function MainApp() {

  const dispatch = useDispatch()

  const [isKnownUser, setIsKnownUser] = useState(false)

  useEffect(() => {

    const readInitialData = async() => {

      // check the local async store first if there is an existing local data
      const isLocalData = await hasLocalData()
      console.log('isLocalData: ' + isLocalData)
      if(isLocalData) {
        setIsKnownUser(true)
        const data = await readData() 
        dispatch(setData(data))

      } else {
        setIsKnownUser(false)
      }
    }
    readInitialData()
  }, [dispatch])

  const finalizeSetup = async (username) => {
    console.log('finalizeSetup')
    // At this point, we know that there is no local data in the device.
    // However, it is possible that there is remote data created in another device.
    // readDataServer return either the server data or, if no data is found, empty data.
    data = await readDataServer(username)
    console.log('---- APP: SERVER DATA')
    console.log(data)
    data.username = username

    // Setdata also persists the data. Afther this, there is synchronized local and server data available
    dispatch(setData(data))

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
