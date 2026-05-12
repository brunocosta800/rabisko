import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { Mail, Phone, MapPin, Settings, LogOut, Briefcase } from 'lucide-react-native';

export function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <View className="px-8 pt-20 pb-12 bg-[#eaddd7] rounded-b-[60px] items-center shadow-sm">
        <View className="relative">
          <View className="w-40 h-40 rounded-full bg-white items-center justify-center border-[6px] border-white shadow-2xl overflow-hidden">
             {user?.avatar ? (
               <Image source={{ uri: user.avatar }} className="w-full h-full" />
             ) : (
               <Text className="text-6xl font-black text-black">{user?.name?.charAt(0)}</Text>
             )}
          </View>
          <TouchableOpacity 
            className="absolute bottom-1 right-1 bg-black p-3 rounded-full border-4 border-[#eaddd7]"
            onPress={() => navigation.navigate('Settings')}
          >
            <Settings size={20} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        
        <Text className="text-[32px] font-black text-black mt-6 uppercase tracking-tighter leading-8">{user?.name}</Text>
        <Text className="text-black/40 font-bold text-xs uppercase tracking-[2px] mt-2">{user?.email}</Text>
      </View>

      <ScrollView className="px-8 pt-10" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ARTIST MODE TOGGLE */}
        <TouchableOpacity 
          className="bg-black p-6 rounded-[32px] flex-row items-center justify-between mb-10 shadow-lg"
          onPress={() => navigation.navigate('ProfessionalDashboard')}
        >
          <View className="flex-row items-center">
            <View className="bg-white/10 p-2 rounded-xl mr-4">
              <Briefcase size={24} color="#eaddd7" strokeWidth={2.5} />
            </View>
            <View>
              <Text className="text-white font-black text-lg uppercase tracking-tight">Modo Profissional</Text>
              <Text className="text-white/40 text-[10px] font-bold uppercase">Gerenciar meu estúdio</Text>
            </View>
          </View>
          <View className="bg-[#eaddd7] px-4 py-1.5 rounded-full">
            <Text className="text-black font-black text-[10px] uppercase">Acessar</Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-between mb-10">
          <View className="items-center bg-[#eaddd7] p-8 rounded-[40px] flex-1 mr-3 shadow-sm">
            <Text className="text-3xl font-black text-black">12</Text>
            <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Reservas</Text>
          </View>
          <View className="items-center bg-[#eaddd7] p-8 rounded-[40px] flex-1 shadow-sm">
            <Text className="text-3xl font-black text-black">4.9</Text>
            <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Média</Text>
          </View>
        </View>

        <View className="bg-[#eaddd7] rounded-[40px] p-8 space-y-6 mb-10 shadow-sm">
          <View className="flex-row items-center mb-6">
            <Mail size={20} color="#000" strokeWidth={2.5} />
            <Text className="text-black font-bold ml-4 text-base">{user?.email}</Text>
          </View>
          <View className="flex-row items-center mb-6">
            <Phone size={20} color="#000" strokeWidth={2.5} />
            <Text className="text-black font-bold ml-4 text-base">(11) 99999-9999</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={20} color="#000" strokeWidth={2.5} />
            <Text className="text-black font-bold ml-4 text-base">São Paulo, SP</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="flex-row items-center justify-center py-6 bg-white border-2 border-black/5 rounded-[32px] mb-10"
          onPress={logout}
        >
          <LogOut size={20} color="#ff3b30" strokeWidth={3} />
          <Text className="text-[#ff3b30] font-black uppercase tracking-widest ml-3">Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
