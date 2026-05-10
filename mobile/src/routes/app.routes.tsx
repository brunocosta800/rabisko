import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Calendar, User, Settings } from 'lucide-react-native';

import { HomeStack } from './home.stack';
import { SearchScreen } from '../screens/App/SearchScreen';
import { BookingsScreen } from '../screens/App/BookingsScreen';
import { ProfileScreen } from '../screens/App/ProfileScreen';
import { SettingsScreen } from '../screens/App/SettingsScreen';
import { theme } from '../theme';

export type AppRoutesParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
  Settings: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.4)',
        tabBarStyle: {
          backgroundColor: '#eaddd7',
          borderTopWidth: 0,
          height: 100,
          paddingBottom: 30,
          paddingTop: 15,
        },
      }}
    >
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={32} strokeWidth={3} />,
        }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Search color={color} size={32} strokeWidth={3} />,
        }}
      />
      <Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar color={color} size={32} strokeWidth={3} />,
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={32} strokeWidth={3} />,
        }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Settings color={color} size={32} strokeWidth={3} />,
        }}
      />
    </Navigator>
  );
}
