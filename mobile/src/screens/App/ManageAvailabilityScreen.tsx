import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar as CalendarIcon, Clock, Check, X, ChevronLeft, Plus, Power, ShieldAlert } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const DAYS = [
  { name: 'SEG', date: '15' },
  { name: 'TER', date: '16' },
  { name: 'QUA', date: '17' },
  { name: 'QUI', date: '18' },
  { name: 'SEX', date: '19' },
  { name: 'SAB', date: '20' },
  { name: 'DOM', date: '21' },
];

const INITIAL_HOURS = [
  { id: '1', time: '09:00', status: 'available' },
  { id: '2', time: '10:30', status: 'booked', client: 'Marcos P.' },
  { id: '3', time: '13:00', status: 'available' },
  { id: '4', time: '14:30', status: 'blocked' },
  { id: '5', time: '16:00', status: 'available' },
  { id: '6', time: '17:30', status: 'available' },
];

export function ManageAvailabilityScreen() {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = React.useState('TER');
  const [isDayBlocked, setIsDayBlocked] = React.useState(false);
  const [hours, setHours] = React.useState(INITIAL_HOURS);

  const toggleStatus = (id: string) => {
    setHours(prev => prev.map(h => {
      if (h.id === id) {
        if (h.status === 'available') return { ...h, status: 'blocked' };
        if (h.status === 'blocked') return { ...h, status: 'available' };
      }
      return h;
    }));
  };

  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      {/* HEADER */}
      <View className="px-8 flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white p-3 rounded-full shadow-sm">
          <ChevronLeft size={24} color="#000" strokeWidth={3} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-black font-black text-xl uppercase tracking-tighter">Agenda</Text>
          <Text className="text-black/40 text-[10px] font-bold uppercase tracking-widest">Maio 2024</Text>
        </View>
        <TouchableOpacity className="bg-black p-3 rounded-full shadow-lg">
          <Plus size={24} color="#fff" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* CALENDAR SELECTOR */}
        <View className="mb-10">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-8 flex-row">
            {DAYS.map((day) => (
              <TouchableOpacity 
                key={day.name} 
                onPress={() => setSelectedDay(day.name)}
                className={`items-center justify-center w-20 h-28 rounded-[40px] mr-3 border-2 ${selectedDay === day.name ? 'bg-black border-black shadow-xl' : 'bg-white border-black/5'}`}
              >
                <Text className={`font-black text-xs uppercase tracking-widest ${selectedDay === day.name ? 'text-[#eaddd7]' : 'text-black/30'}`}>{day.name}</Text>
                <Text className={`font-black text-2xl mt-1 ${selectedDay === day.name ? 'text-white' : 'text-black'}`}>{day.date}</Text>
                {selectedDay === day.name && <View className="w-1.5 h-1.5 bg-[#eaddd7] rounded-full mt-2" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* DAY ACTION */}
        <View className="px-8 mb-10">
          <TouchableOpacity 
            onPress={() => setIsDayBlocked(!isDayBlocked)}
            className={`p-8 rounded-[48px] flex-row items-center justify-between shadow-sm border ${isDayBlocked ? 'bg-red-50 border-red-200' : 'bg-[#eaddd7] border-black/5'}`}
          >
            <View className="flex-row items-center">
              <View className={`p-4 rounded-3xl mr-4 ${isDayBlocked ? 'bg-red-500' : 'bg-black'}`}>
                <Power size={24} color="#fff" strokeWidth={2.5} />
              </View>
              <View>
                <Text className="text-black font-black text-lg uppercase tracking-tight">
                  {isDayBlocked ? 'Dia Bloqueado' : 'Dia Aberto'}
                </Text>
                <Text className="text-black/40 text-xs font-bold">Toque para alternar o dia inteiro</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* TIME SLOTS */}
        <View className="px-8">
          <Text className="text-black font-black text-xs uppercase tracking-[3px] mb-6 px-1 opacity-30">Horários de Terça</Text>
          
          {!isDayBlocked ? hours.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(index * 100).duration(600).springify()}
              layout={Layout.springify()}
              className={`flex-row items-center justify-between p-7 rounded-[40px] mb-4 border ${
                item.status === 'booked' ? 'bg-white border-black/5 opacity-80' : 
                item.status === 'blocked' ? 'bg-gray-100 border-gray-200' : 'bg-white border-black/10 shadow-sm'
              }`}
            >
              <View className="flex-row items-center">
                <View className={`p-3.5 rounded-2xl mr-4 ${item.status === 'booked' ? 'bg-black/5' : 'bg-black'}`}>
                  <Clock size={20} color={item.status === 'booked' ? '#000' : '#fff'} strokeWidth={3} />
                </View>
                <View>
                  <Text className="text-black font-black text-xl tracking-tighter">{item.time}</Text>
                  <Text className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                    item.status === 'booked' ? 'text-black/40' : 
                    item.status === 'blocked' ? 'text-red-500' : 'text-green-600'
                  }`}>
                    {item.status === 'available' ? 'Disponível' : item.status === 'booked' ? `Reservado: ${item.client}` : 'Indisponível'}
                  </Text>
                </View>
              </View>

              {item.status !== 'booked' && (
                <TouchableOpacity 
                  onPress={() => toggleStatus(item.id)}
                  className={`p-3 rounded-full ${item.status === 'available' ? 'bg-black/5' : 'bg-black'}`}
                >
                  {item.status === 'available' ? (
                    <X size={20} color="#ff3b30" strokeWidth={3} />
                  ) : (
                    <Check size={20} color="#fff" strokeWidth={3} />
                  )}
                </TouchableOpacity>
              )}
            </Animated.View>
          )) : (
            <View className="items-center justify-center py-20 opacity-20">
               <ShieldAlert size={80} color="#000" strokeWidth={1} />
               <Text className="text-black font-black text-xl uppercase mt-6 tracking-tighter text-center">Nenhum horário disponível para este dia</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* FOOTER ACTION */}
      {!isDayBlocked && (
        <View className="absolute bottom-10 left-8 right-8">
          <TouchableOpacity className="bg-black h-20 rounded-full items-center justify-center shadow-2xl">
            <Text className="text-white font-black text-xl uppercase tracking-widest">Atualizar Agenda</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
