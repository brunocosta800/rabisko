import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MessageCircle, Calendar, Settings } from 'lucide-react-native';

import { HomeStack } from './home.stack';
import { ChatScreen } from '../screens/App/ChatScreen';
import { CalendarScreen } from '../screens/App/CalendarScreen';
import { SettingsScreen } from '../screens/App/SettingsScreen';
import { colors } from '../theme';

export type AppRoutesParamList = {
  HomeTab:     undefined;
  ChatTab:     undefined;
  CalendarTab: undefined;
  SettingsTab: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

const TAB_BAR_HEIGHT = 80;

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.plum,
        tabBarInactiveTintColor: colors.fg3,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: TAB_BAR_HEIGHT,
          paddingBottom: 20,
          paddingTop: 12,
        },
      }}
    >
      <Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size ?? 24} /> }}
      />
      <Screen
        name="ChatTab"
        component={ChatScreen}
        options={{ tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size ?? 24} /> }}
      />
      <Screen
        name="CalendarTab"
        component={CalendarScreen}
        options={{ tabBarIcon: ({ color, size }) => <Calendar color={color} size={size ?? 24} /> }}
      />
      <Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Settings color={color} size={size ?? 24} /> }}
      />
    </Navigator>
  );
}
