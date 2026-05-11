import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { ChevronLeft, Plus, Trash2, Edit3, Clock, DollarSign, Tag, TrendingDown, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const INITIAL_SERVICES = [
  { id: '1', name: 'Tattoo Realismo (P)', price: '450', duration: '2h', category: 'Realismo', promo: false },
  { id: '2', name: 'Minimalista Traço Fino', price: '250', duration: '1h', category: 'Fine Line', promo: true, oldPrice: '350' },
  { id: '3', name: 'Cobertura (Cover-up)', price: '800', duration: '4h+', category: 'Especialidade', promo: false },
];

export function ManageServicesScreen() {
  const navigation = useNavigation();
  const [services, setServices] = React.useState(INITIAL_SERVICES);

  const togglePromo = (id: string) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) return { ...s, promo: !s.promo };
      return s;
    }));
  };

  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      {/* HEADER */}
      <View className="px-8 flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white p-3 rounded-full shadow-sm">
          <ChevronLeft size={24} color="#000" strokeWidth={3} />
        </TouchableOpacity>
        <Text className="text-black font-black text-xl uppercase tracking-tighter">Serviços</Text>
        <TouchableOpacity className="bg-black p-3 rounded-full shadow-lg">
          <Plus size={24} color="#fff" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* STATS SUMMARY */}
        <View className="px-8 mb-10">
          <View className="bg-black p-8 rounded-[48px] shadow-xl flex-row items-center justify-between">
            <View>
              <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total de Serviços</Text>
              <Text className="text-white font-black text-4xl">{services.length}</Text>
            </View>
            <View className="bg-[#eaddd7] p-5 rounded-[32px]">
              <Tag size={32} color="#000" strokeWidth={2.5} />
            </View>
          </View>
        </View>

        <View className="px-8">
          <Text className="text-black font-black text-xs uppercase tracking-[3px] mb-6 px-1 opacity-30">Tabela de Preços</Text>
          
          {services.map((service, index) => (
            <Animated.View 
              key={service.id}
              entering={FadeInDown.delay(index * 100).duration(600).springify()}
              layout={Layout.springify()}
              className="bg-white p-8 rounded-[48px] mb-6 shadow-sm border border-black/5"
            >
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-[#eaddd7] px-3 py-1 rounded-full mr-2">
                      <Text className="text-black font-black text-[9px] uppercase">{service.category}</Text>
                    </View>
                    {service.promo && (
                      <View className="bg-green-500 px-3 py-1 rounded-full">
                        <Text className="text-white font-black text-[9px] uppercase">Promoção</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-black font-black text-2xl tracking-tighter leading-7">
                    {service.name}
                  </Text>
                </View>
                <TouchableOpacity className="bg-red-50 p-3 rounded-2xl">
                  <Trash2 size={20} color="#ff3b30" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between mb-8">
                <View className="flex-row items-baseline">
                  <Text className="text-black font-black text-3xl tracking-tighter">R$ {service.price}</Text>
                  {service.promo && (
                    <Text className="text-black/20 font-bold text-sm line-through ml-2">R$ {service.oldPrice}</Text>
                  )}
                </View>
                <View className="flex-row items-center bg-gray-50 px-4 py-2 rounded-2xl">
                  <Clock size={16} color="#000" strokeWidth={3} />
                  <Text className="text-black font-bold ml-2 text-sm">{service.duration}</Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between pt-6 border-t border-black/5">
                <View className="flex-row items-center">
                  <TrendingDown size={18} color={service.promo ? '#22c55e' : '#cbd5e1'} strokeWidth={3} />
                  <Text className="text-black/60 font-bold text-xs ml-2">Ativar Promoção</Text>
                  <Switch 
                    value={service.promo}
                    onValueChange={() => togglePromo(service.id)}
                    trackColor={{ false: '#f1f5f9', true: '#000' }}
                    thumbColor={service.promo ? '#eaddd7' : '#fff'}
                    className="ml-2 scale-75"
                  />
                </View>
                <TouchableOpacity className="bg-black w-14 h-14 rounded-[24px] items-center justify-center shadow-lg">
                  <Edit3 size={24} color="#fff" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* ADD CATEGORY BUTTON */}
        <View className="px-8 pb-10">
          <TouchableOpacity 
            className="border-2 border-dashed border-black/10 p-10 rounded-[48px] items-center justify-center bg-white/50"
            activeOpacity={0.6}
          >
            <View className="bg-black p-5 rounded-full mb-4 shadow-xl">
              <Plus size={32} color="#fff" strokeWidth={3} />
            </View>
            <Text className="text-black font-black text-sm uppercase tracking-widest">Nova Categoria</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
