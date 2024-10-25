import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Program from '../components/Program';
import PastPrograms from '../components/PastPrograms';
import PastWorkouts from '../components/PastWorkouts';
import Workout from '../components/Workout';

const Tab = createMaterialTopTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#4b5563' },
        tabBarIndicatorStyle: { backgroundColor: '#60a5fa' },
        tabBarLabelStyle: { color: '#f9fafb', fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Workout" component={Workout} />      
      <Tab.Screen name="Past Workouts" component={PastWorkouts} />
      <Tab.Screen name="Program" component={Program} />
      <Tab.Screen name="Past Programs" component={PastPrograms} />
    </Tab.Navigator>
  );
}