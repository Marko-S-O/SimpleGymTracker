import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CurrentProgram from '../components/CurrentProgram'
import PastPrograms from '../components/PastPrograms'
import PastWorkouts from '../components/PastWorkouts'
import CurrentWorkout from '../components/CurrentWorkout'

const Tab = createMaterialTopTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#4b5563' },
        tabBarIndicatorStyle: { backgroundColor: '#60a5fa' },
        tabBarLabelStyle: { color: '#f9fafb', fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Workout" component={CurrentWorkout} />      
      <Tab.Screen name="Past Workouts" component={PastWorkouts} />
      <Tab.Screen name="Program" component={CurrentProgram} />
      <Tab.Screen name="Past Programs" component={PastPrograms} />
    </Tab.Navigator>
  )
}