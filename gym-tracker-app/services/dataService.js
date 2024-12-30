// Server communications part of this program makes use of the Uni Helsinki
// FullStackOpen example program
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import axios from 'axios';
import { getEmptyData } from '../util/dataHelper';
import { API_URL } from '@env';
import { createExerciseList } from '../util/dataHelper';

const DEV_API_URL =
    Platform.OS == 'android'
        ? 'http://10.0.2.2:3001/api/data'
        : 'http://localhost:3001/api/data';
const apiUrl = API_URL || DEV_API_URL;

// There is no separate user creation and login. If a user does not exist, we create a new one.
// After done, the token is kept in the local device and is valid as long as the same local async storage is used.
export const setupSession = async (userId, password) => {
    try {
        const response = await axios.post(apiUrl, {
            username: userId,
            password: password,
        });

        if (response.status == 401) {
            // failed authentication of an existing user
            console.log('authentication failed for user: ' + userId);
            return null;
        } else if (response.status == 200) {
            // existing user, succesfull authentication
            const { token, userId } = response.data;
            data = await readDataServer(userId, token);
            data.userId = userId;
            data.token = token;
            return data;
        } else if (response.status == 201) {
            // new user created
            const { token, userId } = response.data;
            const data = getEmptyData();
            data.userId = userId;
            data.token = token;
            return data;
        } else {
            console.log(
                'Unknown server response indicates a bug or environment issue: ' +
                    response.status
            );
            return null;
        }
    } catch (error) {
        console.log('Failed setting up a user', error);
    }
};

const saveDataToServer = async (data) => {
    try {
        const token = data.data.token;
        const url = apiUrl + '/' + data.data.userId;
        const response = await axios.put(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error saving data to server', error);
    }
};

export const saveDataLocal = async (data) => {
    try {
        await AsyncStorage.setItem(`gym-tracker-data`, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data to local storage:', error);
    }
};

export const saveData = async (data) => {
    try {
        saveDataLocal(data);
    } catch (error) {
        console.error('Error saving data locally', error);
    }

    try {
        saveDataToServer(data);
    } catch (error) {
        console.error('Error saving data to server', error);
    }
};

const convertDates = (data) => {
    const fixedData = { ...data };

    if (fixedData.currentWorkout?.created) {
        fixedData.currentWorkout.created = new Date(
            fixedData.currentWorkout.created
        );
    }
    if (fixedData.currentWorkout?.saved) {
        fixedData.currentWorkout.saved = new Date(
            fixedData.currentWorkout.saved
        );
    }

    fixedData.pastWorkouts?.forEach((workout) => {
        workout.created = new Date(workout.created);
        workout.saved = new Date(workout.saved);
    });

    if (fixedData.currentProgram?.created) {
        fixedData.currentProgram.created = new Date(
            fixedData.currentProgram.created
        );
    }
    if (fixedData.currentProgram?.saved) {
        fixedData.currentProgram.saved = new Date(
            fixedData.currentProgram.saved
        );
    }

    fixedData.pastPrograms?.forEach((program) => {
        program.created = new Date(program.created);
        program.saved = new Date(program.saved);
    });
    return fixedData;
};

const sortData = (data) => {
    const sortedData = { ...data };
    sortedData.pastWorkouts.sort((w1, w2) => w2.saved - w1.saved);
    sortedData.pastPrograms.sort((p1, p2) => p2.saved - p1.saved);
    return sortedData;
};

const selectNewer = (object1, object2) => {
    return object1.saved >= object2.saved ? object1 : object2;
};

// Merge server and local data. This is done always when reading the data. Reading data
// only happens when there is no existing session or user invokes the refresh action in UI.
//
// Merge strategy:
// - Take newer of the current workout and current program (saved timestamp)
// - Merge past workouts and past programs
// - Remove duplicates in pastWorkouts and pastPrograms (same saved timestamp)
// - After merge, update the merged data to the server and local storage
const mergeData = (localData, serverData) => {
    const currentWorkout =
        localData.currentWorkout && serverData.currentWorkout
            ? selectNewer(localData.currentWorkout, serverData.currentWorkout)
            : localData.currentWorkout || serverData.currentWorkout;

    const currentProgram =
        localData.currentProgram && serverData.currentProgram
            ? selectNewer(localData.currentProgram, serverData.currentProgram)
            : localData.currentProgram || serverData.currentProgram;

    let pastWorkouts = localData.pastWorkouts ? localData.pastWorkouts : [];
    if (serverData.pastWorkouts) {
        pastWorkouts = pastWorkouts.concat(serverData.pastWorkouts);
    }
    const workoutMap = new Map(
        pastWorkouts.map((workout) => [workout.saved.toString(), workout])
    );
    pastWorkouts = Array.from(workoutMap.values());
    let pastPrograms = localData.pastPrograms ? localData.pastPrograms : [];
    if (serverData.pastPrograms) {
        pastPrograms = pastPrograms.concat(serverData.pastPrograms);
    }
    const programMap = new Map(
        pastPrograms.map((program) => [program.saved, program])
    );
    pastPrograms = Array.from(programMap.values());

    const uid = serverData.userId ? serverData.userId : localData.userId;

    if (uid == null || uid.length == 0) {
        console.log(
            'No username found in merge. Please send a bug report to the author.'
        );
    }

    const mergedData = {
        userId: uid,
        token: localData.token,
        currentWorkout: currentWorkout,
        currentProgram: currentProgram,
        pastWorkouts: pastWorkouts,
        pastPrograms: pastPrograms,
    };

    return mergedData;
};

const readDataLocal = async () => {
    try {
        const localInput = await AsyncStorage.getItem(`gym-tracker-data`);
        if (localInput !== null) {
            let localData = JSON.parse(localInput);
            localData = convertDates(localData.data);
            localData = sortData(localData);
            return localData;
        } else {
            console.log('No local data found');
            return getEmptyData();
        }
    } catch (error) {
        console.error('Failed to read local data:', error);
        return getEmptyData();
    }
};

export const readDataServer = async (uid, token) => {
    try {
        const url = apiUrl + '/' + uid;

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const serverInput = response.data.data;
        if (serverInput !== null) {
            let serverData = JSON.parse(serverInput);

            serverData = convertDates(serverData);
            serverData = sortData(serverData);
            return serverData;
        } else {
            console.log('No server data found');
            return getEmptyData();
        }
    } catch (error) {
        console.error('Failed to read server data:', error);
        return getEmptyData();
    }
};

export const readData = async () => {
    const localData = await readDataLocal();
    const uid = localData.userId;
    const token = localData.token;

    const serverData = await readDataServer(uid, token);

    let data = mergeData(localData, serverData);
    data = sortData(data);
    const exerciseNames = createExerciseList(data);
    data.exerciseNames = exerciseNames;

    return data;
};

export const hasLocalData = async () => {
    try {
        const localInput = await AsyncStorage.getItem(`gym-tracker-data`);
        hasData = localInput != null;
        return hasData;
    } catch (error) {
        console.error('Failed to read local data in hasLocalData:', error);
        return false;
    }
};
