import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, ChevronRight } from 'lucide-react-native';

const BOOKINGS = [
  {
    id: '1',
    establishment: 'João Santos',
    service: 'Tatuagem Realista',
    date: '15 de Maio, 2024',
    time: '14:00',
    status: 'Confirmado',
    image: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    establishment: 'Barbearia VIP',
    service: 'Corte + Barba',
    date: '20 de Maio, 2024',
    time: '10:00',
    status: 'Pendente',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

export function BookingsScreen() {
  return (
    <View className="flex-1 bg-white pt-14">
      <View className="px-6 mb-8">
        <Text className="text-4xl font-bold text-black uppercase tracking-tighter">Minhas Reservas</Text>
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row space-x-4 mb-8">
          <TouchableOpacity className="bg-black px-6 py-2 rounded-full">
            <Text className="text-white font-bold">Ativas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary-100 px-6 py-2 rounded-full">
            <Text className="text-black font-bold">Histórico</Text>
          </TouchableOpacity>
        </View>

        {BOOKINGS.map((booking) => (
          <TouchableOpacity 
            key={booking.id}
            className="bg-primary-100/30 border border-primary-100 rounded-[32px] p-6 mb-6 flex-row items-center"
          >
            <Image 
              source={{ uri: booking.image }} 
              className="w-16 h-16 rounded-2xl mr-4 bg-gray-200"
            />
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-black font-bold text-lg">{booking.establishment}</Text>
                <View className={`px-3 py-1 rounded-full ${booking.status === 'Confirmado' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Text className={`text-[10px] font-bold ${booking.status === 'Confirmado' ? 'text-green-700' : 'text-yellow-700'}`}>
                    {booking.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mb-2">{booking.service}</Text>
              <View className="flex-row items-center mb-4">
                <View className="flex-row items-center mr-4">
                  <View className="mr-1">
                    <Calendar size={12} color="#666" />
                  </View>
                  <Text className="text-gray-500 text-xs">{booking.date}</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-1">
                    <Clock size={12} color="#666" />
                  </View>
                  <Text className="text-gray-500 text-xs">{booking.time}</Text>
                </View>
              </View>
            </View>
            <View className="ml-2">
              <ChevronRight size={20} color="#000" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
