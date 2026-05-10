import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/App/HomeScreen';
import { EstablishmentProfileScreen } from '../screens/App/EstablishmentProfileScreen';
import { BookingScreen } from '../screens/App/BookingScreen';
import { PaymentScreen } from '../screens/App/PaymentScreen';

export type HomeStackParamList = {
  HomeList: undefined;
  EstablishmentProfile: { id: string };
  BookingFlow: { id: string };
  Payment: { bookingId: string };
};

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeList" component={HomeScreen} />
      <Screen name="EstablishmentProfile" component={EstablishmentProfileScreen} />
      <Screen name="BookingFlow" component={BookingScreen} />
      <Screen name="Payment" component={PaymentScreen} />
    </Navigator>
  );
}
