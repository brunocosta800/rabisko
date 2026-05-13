import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MessageCircle, Calendar, Settings, LucideIcon } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { HomeStack } from './home.stack';
import { ChatScreen } from '../screens/App/ChatScreen';
import { BookingsScreen } from '../screens/App/BookingsScreen';
import { SettingsScreen } from '../screens/App/SettingsScreen';

/**
 * Bottom tabs per the design system (DESIGN.md §8.2 — BottomNav): cream surface, 4 tabs
 * (Home · Chat · Sessões · Settings), active tab tinted plum with an animated underline pill
 * and a 1.12 icon scale. (Search/map and the standalone Profile tab were dropped — see
 * IMPLEMENTATION-CHECKLIST.md P3.)
 */
export type AppRoutesParamList = {
  Home: undefined;
  Chat: undefined;
  Sessoes: undefined;
  Settings: undefined;
};

const PLUM = '#602C66';
const INK = '#000000';
const CREAM = '#EAE0D5';
const SPRING = { damping: 16, stiffness: 200 } as const;

function TabBarIcon({ Icon, focused }: { Icon: LucideIcon; focused: boolean }) {
  const progress = useDerivedValue(() => withSpring(focused ? 1 : 0, SPRING));
  const iconStyle = useAnimatedStyle(() => ({ transform: [{ scale: 1 + progress.value * 0.12 }] }));
  const underlineStyle = useAnimatedStyle(() => ({ width: progress.value * 18 }));
  return (
    <View style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={iconStyle}>
        <Icon size={26} color={focused ? PLUM : INK} />
      </Animated.View>
      <Animated.View
        style={[
          { position: 'absolute', bottom: 2, height: 3, borderRadius: 2, backgroundColor: PLUM },
          underlineStyle,
        ]}
      />
    </View>
  );
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: CREAM,
          borderTopWidth: 0,
          height: 96,
          paddingTop: 14,
          paddingBottom: 24,
        },
      }}
    >
      <Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon Icon={Home} focused={focused} /> }}
      />
      <Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon Icon={MessageCircle} focused={focused} /> }}
      />
      <Screen
        name="Sessoes"
        component={BookingsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon Icon={Calendar} focused={focused} /> }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon Icon={Settings} focused={focused} /> }}
      />
    </Navigator>
  );
}
