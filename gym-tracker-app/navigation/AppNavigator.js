import React from 'react'
import { Platform, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CurrentProgram from '../components/CurrentProgram'
import PastPrograms from '../components/PastPrograms'
import PastWorkouts from '../components/PastWorkouts'
import CurrentWorkout from '../components/CurrentWorkout'
import AppHeader from '../components/AppHeader'
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

const styles = Platform.OS === 'web' ? webStyles : androidStyles;

const Tab = createMaterialTopTabNavigator()

export default function AppNavigator() {
    return (
        <View style={{ flex: 1}}>
            <AppHeader />
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
                <Tab.Screen name="Old Prs" component={PastPrograms} />
            </Tab.Navigator>
        </View>
    )

}