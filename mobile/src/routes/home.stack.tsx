import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/App/HomeScreen';
import { ArtistScreen } from '../screens/App/ArtistScreen';
import { BookingScreen } from '../screens/App/BookingScreen';
import { PaymentScreen } from '../screens/App/PaymentScreen';
import { ConfirmedScreen } from '../screens/App/ConfirmedScreen';

export type HomeStackParamList = {
  HomeList:     undefined;
  Artist:       { id: string };
  BookingFlow:  { artistId: string };
  Payment:      { artistId: string };
  Confirmed:    undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeList"    component={HomeScreen} />
      <Screen name="Artist"      component={ArtistScreen} />
      <Screen name="BookingFlow" component={BookingScreen} />
      <Screen name="Payment"     component={PaymentScreen} />
      <Screen name="Confirmed"   component={ConfirmedScreen} />
    </Navigator>
  );
}
