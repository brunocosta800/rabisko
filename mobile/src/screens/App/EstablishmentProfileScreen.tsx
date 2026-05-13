import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronLeft, Star, MapPin, Clock, ShieldCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';

export function EstablishmentProfileScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View className="relative h-72">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800&auto=format&fit=crop' }} 
            className="w-full h-full"
          />
          <TouchableOpacity 
            className="absolute top-12 left-6 bg-white/80 p-2 rounded-r-pill"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-6 -mt-10 bg-white rounded-t-r-2xl pt-8 pb-32">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-black uppercase">João Santos</Text>
              <View className="flex-row items-center mt-1">
                <View className="mr-1">
                  <MapPin size={14} color="#6B6B6B" />
                </View>
                <Text className="text-gray-500 ml-1">Jardins, São Paulo • 1.2km</Text>
              </View>
            </View>
            <View className="bg-surface px-4 py-2 rounded-r-md items-center">
              <View className="flex-row items-center">
                <Star size={16} color="#000" fill="#000" />
                <Text className="text-black font-bold ml-1">4.9</Text>
              </View>
              <Text className="text-gray-500 text-[10px]">128 avaliações</Text>
            </View>
          </View>

          <View className="flex-row space-x-3 mb-8">
            <View className="bg-black px-4 py-2 rounded-r-pill">
              <Text className="text-white text-xs">Realismo</Text>
            </View>
            <View className="bg-black px-4 py-2 rounded-r-pill">
              <Text className="text-white text-xs">Minimalista</Text>
            </View>
            <View className="bg-surface px-4 py-2 rounded-r-pill flex-row items-center">
              <View className="mr-1">
                <ShieldCheck size={12} color="#000" />
              </View>
              <Text className="text-black text-xs font-bold">Verificado</Text>
            </View>
          </View>

          <Text className="text-black font-bold text-xl mb-4">Sobre</Text>
          <Text className="text-gray-500 leading-6 mb-8">
            Especialista em realismo e traços finos com mais de 8 anos de experiência. 
            Premiado em convenções nacionais, busco transformar sua ideia em uma obra de arte única na pele.
          </Text>

          <Text className="text-black font-bold text-xl mb-4">Portfólio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Image 
                key={i}
                source={{ uri: `https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=200&h=200&auto=format&fit=crop&sig=${i}` }} 
                className="w-40 h-40 rounded-r-xl mr-4 bg-gray-200"
              />
            ))}
          </ScrollView>

          <Text className="text-black font-bold text-xl mb-4">Horários</Text>
          <View className="bg-surface-2 p-4 rounded-r-lg">
            <View className="flex-row justify-between mb-2">
              <Text className="text-black">Segunda - Sexta</Text>
              <Text className="text-black font-bold">10:00 - 20:00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-black">Sábado</Text>
              <Text className="text-black font-bold">09:00 - 15:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-6 pb-10 border-t border-gray-100 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-500 text-sm">A partir de</Text>
          <Text className="text-black text-2xl font-bold">R$ 250,00</Text>
        </View>
        <Button 
          title="Reservar Agora" 
          className="px-10" 
          onPress={() => navigation.navigate('BookingFlow' as never)}
        />
      </View>
    </View>
  );
}
