import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LandingScreen } from '../screens/Auth/LandingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';

export type AuthRoutesParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8F9FA' } }}
    >
      <Screen name="Landing"  component={LandingScreen} />
      <Screen name="Login"    component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
    </Navigator>
  );
}
