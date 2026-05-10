import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export function LoginScreen() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();

  const handleLogin = () => {
    // Mock login
    setUser({
      id: '1',
      name: 'User Test',
      email: 'test@example.com',
    });
  };

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-[#f8f9fa] px-8 pt-24">
      <View className="mb-14">
        <Text className="text-[44px] font-black text-black uppercase leading-[40px] tracking-tighter mb-4">
          Bem-vindo de volta
        </Text>
        <Text className="text-black text-[15px] font-medium leading-tight">
          Acesse sua conta para continuar gerenciando seu portfólio e agendamentos.
        </Text>
      </View>

      <View>
        <Input 
          label="E-mail"
          placeholder="contato@studio.com"
          icon={Mail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input 
          label="Senha"
          placeholder="**********"
          icon={Lock}
          secure
        />

        <TouchableOpacity 
          className="self-end -mt-2"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text className="text-sm text-black font-semibold">Esqueceu a Senha?</Text>
        </TouchableOpacity>

        <Button 
          title="Entrar"
          onPress={handleLogin}
          className="mt-12"
        />

        <View className="flex-row justify-center mt-10">
          <Text className="text-gray-600 font-medium">Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-black font-bold">Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
