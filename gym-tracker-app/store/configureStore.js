import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducers/dataReducer'
import dataPersisterMiddleware from '../middleware/dataPersisterMiddleware'

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(dataPersisterMiddleware),
})

export default store