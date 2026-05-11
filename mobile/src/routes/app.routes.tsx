import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Search, MessageSquare, Calendar, User, Settings } from 'lucide-react-native';

import { HomeStack } from './home.stack';
import { SearchScreen } from '../screens/App/SearchScreen';
import { BookingsScreen } from '../screens/App/BookingsScreen';
import { ProfileScreen } from '../screens/App/ProfileScreen';
import { SettingsScreen } from '../screens/App/SettingsScreen';
import { theme } from '../theme';

import { ChatListScreen } from '../screens/App/ChatListScreen';
import { ProfessionalDashboardScreen } from '../screens/App/ProfessionalDashboardScreen';
import { ManageAvailabilityScreen } from '../screens/App/ManageAvailabilityScreen';
import { ManageServicesScreen } from '../screens/App/ManageServicesScreen';
import { ManagePortfolioScreen } from '../screens/App/ManagePortfolioScreen';
import { StudioSettingsScreen } from '../screens/App/StudioSettingsScreen';

export type AppRoutesParamList = {
  Home: undefined;
  Search: undefined;
  Chat: undefined;
  Bookings: undefined;
  Profile: undefined;
  Settings: undefined;
  ProfessionalDashboard: undefined;
  ManageAvailability: undefined;
  ManageServices: undefined;
  ManagePortfolio: undefined;
  StudioSettings: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const visibleRoutes = ['Home', 'Search', 'Chat', 'Bookings', 'Profile', 'Settings'];
  
  return (
    <View 
      style={{
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(234, 221, 215, 0.98)',
        borderRadius: 20,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        if (!visibleRoutes.includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const renderIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              width: 50,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View className={`items-center justify-center rounded-xl ${isFocused ? 'bg-black w-10 h-10' : 'w-10 h-10'}`}>
              {renderIcon && renderIcon({ 
                focused: isFocused, 
                color: isFocused ? "#fff" : "rgba(0,0,0,0.2)", 
                size: 26 
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function AppRoutes() {
  return (
    <Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Home color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Search color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="Chat"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MessageSquare color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Calendar color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <User color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Settings color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Screen
        name="ProfessionalDashboard"
        component={ProfessionalDashboardScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="ManageAvailability"
        component={ManageAvailabilityScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="ManageServices"
        component={ManageServicesScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="ManagePortfolio"
        component={ManagePortfolioScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="StudioSettings"
        component={StudioSettingsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
