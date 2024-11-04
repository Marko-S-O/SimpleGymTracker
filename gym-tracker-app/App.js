import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { DataProvider } from './context/DataContext'
import { setData } from './reducers/dataActions'
import { readData } from './services/dataService'
import store from './store/configureStore'

function MainApp() {

  const dispatch = useDispatch()

  useEffect(() => {
    const readInitialData = async() => {
      const data = await readData() 
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
    <Provider store={store}> 
      <DataProvider>
        <MainApp />
      </DataProvider>
    </Provider>
  )
}
