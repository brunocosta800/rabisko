import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, SlidersHorizontal, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../routes/home.stack';

const CATEGORIES = ['Tatuagem', 'Barbearia', 'Estética', 'Piercing', 'Massagem'];

const ESTABLISHMENTS = [
  {
    id: '1',
    name: 'João Santos',
    rating: 4.9,
    category: 'Tatuagem',
    avatar: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Estúdio Fênix',
    rating: 4.8,
    category: 'Barbearia',
    avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

import Animated, { FadeInDown } from 'react-native-reanimated';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-[#f8f9fa] pt-16">
      <View className="px-8 mb-6">
        <Text className="text-[48px] font-black text-black uppercase leading-[44px] tracking-tighter mb-8 text-center">
          Busque seu artista
        </Text>

        <View className="flex-row items-center bg-[#eaddd7] rounded-[24px] px-6 py-5 mb-8 shadow-sm">
          <View className="mr-3">
            <Search size={24} color="#000" strokeWidth={3} />
          </View>
          <TextInput
            placeholder="Artistas, estúdios..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            className="flex-1 text-black text-lg font-bold"
          />
          <TouchableOpacity>
            <SlidersHorizontal size={24} color="#000" strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
          {['Preço', 'Estilo', 'Dinheiro', 'Avaliação'].map((filter, index) => (
            <TouchableOpacity 
              key={filter}
              className="bg-[#eaddd7] px-6 py-3 rounded-full mr-3 flex-row items-center shadow-sm"
            >
              <Text className="font-black text-black text-[12px] uppercase tracking-widest">{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="px-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {ESTABLISHMENTS.map((item, index) => (
          <Animated.View 
            key={item.id}
            entering={FadeInDown.delay(index * 100).duration(600).springify()}
          >
            <TouchableOpacity 
              className="bg-black rounded-[32px] mb-8 overflow-hidden shadow-xl"
              activeOpacity={0.9}
              onPress={() => navigation.navigate('EstablishmentProfile', { id: item.id })}
            >
              <View className="p-8 relative">
                <View className="flex-row items-center">
                  <Image 
                    source={{ uri: item.avatar }} 
                    className="w-20 h-20 rounded-full border-2 border-[#eaddd7]"
                  />
                  <View className="ml-5 flex-1">
                    <Text className="text-white font-black text-2xl uppercase tracking-tighter">{item.name}</Text>
                    <View className="flex-row mt-3">
                      {['Realismo', 'Minimalista'].map((tag) => (
                        <View key={tag} className="bg-white/10 rounded-full px-3 py-1 mr-2 border border-white/20">
                          <Text className="text-white text-[10px] font-bold uppercase tracking-widest">{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                
                <View className="absolute top-8 right-8 flex-row items-center bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Text className="text-white font-black text-lg mr-1">{item.rating}</Text>
                  <Star size={16} color="#fff" fill="#fff" />
                </View>
              </View>
              
              <View className="bg-[#eaddd7] py-4 items-center">
                <Text className="text-black font-black text-[13px] uppercase tracking-[3px]">ver perfil completo</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
