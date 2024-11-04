// When the global state is updated by the user, the data is also persisted.
// Updates to the global state only take place when the full program or workout is saved or activated,
// not inside editing individual parts of program of workout.
// This is save only and done both to local and server storage.
// Persistence is implemented asynchronously in the middleware to minimize impact
// on responsibility and risk of state inconsistency.
import { saveData } from '../services/dataService'
import * as actionTypes from '../reducers/actionTypes'

const dataPersisterMiddleware = store => next => action => {

    const result = next(action)

    // SET_DATA is used to set the data when it is read from the server.
    // All the other action types come from the UI and are triggered by the user.
    if(action.type != actionTypes.SET_DATA) {
        const data = store.getState()
        saveData(data)
    }
    return result
}

export default dataPersisterMiddleware
