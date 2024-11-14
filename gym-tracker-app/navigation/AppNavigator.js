import React,  {useState} from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import CurrentProgram from '../components/CurrentProgram'
import PastPrograms from '../components/PastPrograms'
import PastWorkouts from '../components/PastWorkouts'
import CurrentWorkout from '../components/CurrentWorkout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ConfirmModal from '../components/ConfirmModal'
import { refreshAndSetData } from '../reducers/dataActions'
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.tabBarIndicator,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tab.Screen name="Workout" component={CurrentWorkout} />
            <Tab.Screen name="History" component={PastWorkouts} />
            <Tab.Screen name="Program" component={CurrentProgram} />
            <Tab.Screen name="Old Prgms" component={PastPrograms} />
        </Tab.Navigator>
    )
}

export default function AppNavigator() {

    const [refreshModalVisible, setRefreshModalVisible] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state => state.data);
    const username = state.username && state.username.length > 0 ? state.username : ''

    console.log('AppNavigator ' + username)

    // Refresh data: read local and server storage, merge data, update to the global state.
    const refreshData = () => {
        console.log('refresh')
        dispatch(refreshAndSetData())    
        setRefreshModalVisible(false)
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Simple Gym Tracker - " + username}
                component={TabNavigator}
                options={{
                    headerRight: () => (            
                        <TouchableOpacity onPress={()=>setRefreshModalVisible(true)} style={{ marginRight: 15 }}>
                            <Icon name="refresh" size={24} color="#fff" />
                            <ConfirmModal
                                visible={refreshModalVisible}
                                onConfirm={refreshData}
                                onRequestClose={() => setRefreshModalVisible(false) }
                                header='Synchronize App and Server Data'
                                message='Warning: this will void unsaved changes in WORKOUT and PROGRAM tabs. Proceed?'
                            />              
                        </TouchableOpacity>
                    ),
                    headerStyle: styles.stackNavigatorHeader,
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}