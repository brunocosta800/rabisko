import 'react-native-gesture-handler';
import './src/styles/global.css';

import React from 'react';

import { StatusBar } from 'expo-status-bar';

import {
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './src/routes';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar style="dark" />
                    <Router />
                </View>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}