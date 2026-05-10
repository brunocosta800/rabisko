import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { NewPasswordScreen } from '../screens/Auth/NewPasswordScreen';

export type AuthRoutesParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewPassword: { email: string };
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#f8f9fa' },
      }}
    >
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Screen name="NewPassword" component={NewPasswordScreen} />
    </Navigator>
  );
}
