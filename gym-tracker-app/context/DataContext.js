import React, { createContext, useReducer, useContext } from 'react'
import dataReducer, { initialState } from '../reducers/dataReducer'

// Create the context
const DataContext = createContext()

// Provider component
export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState)

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

// Custom hook to use the DataContext
export const useData = () => useContext(DataContext)