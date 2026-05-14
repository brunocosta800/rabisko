import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LandingScreen } from '../screens/Auth/LandingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { NewPasswordScreen } from '../screens/Auth/NewPasswordScreen';
import { theme } from '../theme';

export type AuthRoutesParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewPassword: { email: string };
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Screen name="Landing" component={LandingScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Screen name="NewPassword" component={NewPasswordScreen} />
    </Navigator>
  );
}
