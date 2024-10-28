import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { useData, DataProvider } from './context/DataContext'
import { setData } from './reducers/dataActions'
import testData from './test/testData'

function MainApp() {

  const { dispatch } = useData()

  // Using test data to test state management and component functionality
  useEffect(() => {
    const data = testData.data
    console.log("Dispatching setData with:", data)    
    dispatch(setData(data))
  }, [dispatch])

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default function App() {

  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  )
}
