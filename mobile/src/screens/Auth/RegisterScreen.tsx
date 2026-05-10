import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Mail, Lock, User, Calendar, CreditCard, MapPin, Clock, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#f8f9fa]"
    >
      <ScrollView className="flex-1 px-8 pt-16" showsVerticalScrollIndicator={false}>
        <View className="mb-12">
          <Text className="text-[44px] font-black text-black uppercase leading-[40px] tracking-tighter mb-4">
            Cadastre-se
          </Text>
          <Text className="text-black text-[15px] font-medium leading-tight">
            Sua arte merece o palco principal.
          </Text>
        </View>

        <View className="pb-16">
          <Input 
            label="Nome Completo"
            placeholder="Ex: Pedro Campos"
          />

          <View className="flex-row items-center mb-0">
            <View className="flex-1 mr-3">
              <Input 
                label="Nascimento"
                placeholder="dd/mm/yyyy"
              />
            </View>
            <View className="flex-1">
              <Input 
                label="CPF"
                placeholder="000.000.000-00"
              />
            </View>
          </View>

          <Input 
            label="E-mail Profissional"
            placeholder="contato@studio.com"
            icon={Mail}
          />

          <Input 
            label="Senha"
            placeholder="**********"
            icon={Lock}
            secure
          />

          <Input 
            label="Confirmar Senha"
            placeholder="**********"
            icon={Lock}
            secure
          />

          {/* Business Section Info */}
          <View className="bg-[#eaddd7] p-8 rounded-[40px] mt-4">
            <View className="flex-row items-center mb-3 ml-1">
              <MapPin size={20} color="#000" strokeWidth={2.5} />
              <Text className="font-bold text-black ml-2 text-base">Localização</Text>
            </View>
            <View className="bg-[#eaddd7] border border-black rounded-xl p-3.5 mb-6">
              <Text className="text-black font-medium">Rua das Artes, 123 - Jardins, SP</Text>
            </View>

            <View className="flex-row items-center mb-3 ml-1">
              <Clock size={20} color="#000" strokeWidth={2.5} />
              <Text className="font-bold text-black ml-2 text-base">Horários de Atendimento</Text>
            </View>
            <View className="bg-[#eaddd7] border border-black rounded-xl p-3.5 flex-row justify-between mb-2.5">
              <Text className="text-black font-medium">Segunda - Sexta</Text>
              <Text className="text-black font-medium">10:00 - 20:00</Text>
            </View>
            <View className="bg-[#eaddd7] border border-black rounded-xl p-3.5 flex-row justify-between">
              <Text className="text-black font-medium">Sábado</Text>
              <Text className="text-black font-medium">09:00 - 15:00</Text>
            </View>
          </View>

          <Button 
            title="Finalizar Cadastro"
            onPress={() => navigation.goBack()}
            className="mt-12"
          />

          <TouchableOpacity className="items-center mt-6" onPress={() => navigation.goBack()}>
            <Text className="text-black font-bold">Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
