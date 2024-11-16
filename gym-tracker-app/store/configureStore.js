import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducers/dataReducer'
import dataPersisterMiddleware from '../middleware/dataPersisterMiddleware'

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(dataPersisterMiddleware),
})

//store.subscribe(() => {
//    const currentState = store.getState()
//    console.log('State has changed:', currentState)
//    console.trace('trace of state change')
//})

export default store