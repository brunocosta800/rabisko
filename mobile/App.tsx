import 'react-native-gesture-handler';
import './src/styles/global.css';

import React, { useEffect, useState } from 'react';

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

// If fonts don't resolve within this many ms, render anyway with system fonts.
// Without this, a slow/blocked Google Fonts CDN would leave the app stuck on the splash.
const FONT_LOAD_TIMEOUT_MS = 8000;

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
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

    const [timedOut, setTimedOut] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setTimedOut(true), FONT_LOAD_TIMEOUT_MS);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (fontError) {
            console.warn('[App] useFonts failed, falling back to system fonts:', fontError);
        }
    }, [fontError]);

    const ready = fontsLoaded || !!fontError || timedOut;

    // Hide the splash from a useEffect (fires after commit) with a single retry —
    // on Expo Go SDK 54 / Android the first call sometimes resolves OK but the
    // splash overlay lingers. Two attempts at 0ms + 500ms covers the timing window.
    useEffect(() => {
        if (!ready) return;
        const hide = () => SplashScreen.hideAsync().catch(() => {});
        hide();
        const t = setTimeout(hide, 500);
        return () => clearTimeout(t);
    }, [ready]);

    if (!ready) {
        return null;
    }

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
