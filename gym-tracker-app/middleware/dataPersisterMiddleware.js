// When the global state is updated, the data is also persisted.
//
// Updates to the global state only take place when the save to the current program or workout is 
// triggered by user action, not when just individual exercise or set is updated. 
// State of these subcomponents is maintained in the internal state of each UI component.
//
// Persisting the data is done both to the server and local storage.
//
// Persistence is implemented asynchronously in the middleware to minimize impact on responsibility.
//
import { saveData, readData, readDataServer } from '../services/dataService'
import * as actionTypes from '../reducers/actionTypes'

const dataPersisterMiddleware = store => next => async action => {

    if(action.type == actionTypes.REFRESH_AND_SET_DATA) {
        // Refresh is done when user clicks the refresh icon in the top-right corner. 
        // Refresh reads the local and server data, merges them and updates to the global state.
        // Use case for this is that the user prepares the workout or program in web, 
        // goes to the gym with a phone and starts tracking the exercise.
        const data = await readData()
        action.payload = data
        next(action)
        return result

    } else if(action.type == actionTypes.SETUP_USER) {

        const userId = action.payload.userId

        // when setting up user, replace the data empty new user data
        // by the server data if available
        const data = await readDataServer(userId)
        if(data && data.userId && data.userId.lenght > 0) {
            action.payload = {...data}
        }
        const result = next(action)
        return result

    } else {
        // Data is updated to the global state only when the user clicks save in the workout or program tab.
        // The persistence to the local and global storage is always done when the global state changes.

        const result = next(action);
        const state = store.getState();
        await saveData(state);
        return result;

    }
}

export default dataPersisterMiddleware
