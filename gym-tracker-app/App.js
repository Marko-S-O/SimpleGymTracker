import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { useData, DataProvider } from './context/DataContext'
import { setData } from './reducers/dataActions'
import { readData } from './services/dataService'

function MainApp() {

  const { dispatch } = useData()

  useEffect(() => {
    const readInitialData = async() => {
      const data = await readData() 
      //console.log(data)
      dispatch(setData(data))
    }
    readInitialData()
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
