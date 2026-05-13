import 'react-native-gesture-handler';
import './src/styles/global.css';

import React, { useCallback } from 'react';

import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import {
    Inter_300Light,
    Inter_400Regular,
    Inter_400Regular_Italic,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

import { Router } from './src/routes';

// Keep the splash screen up until the design-system fonts are ready (F3).
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    const [fontsLoaded] = useFonts({
        // keys here become the font-family names referenced by tailwind.config.js `fontFamily`
        BebasNeue_400Regular,
        Inter_300Light,
        Inter_400Regular,
        Inter_400Regular_Italic,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        DMSans_400Regular,
        DMSans_700Bold,
    });

    const onLayoutRootView = useCallback(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <SafeAreaProvider>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar style="dark" />
                    <Router />
                </View>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
