import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ChevronLeft, Plus, Trash2, LayoutGrid, Heart, Eye, Filter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PORTFOLIO_ITEMS = [
  { id: '1', image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=400&h=400&auto=format&fit=crop', category: 'Realismo', likes: 128, views: 1204 },
  { id: '2', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&h=400&auto=format&fit=crop', category: 'Old School', likes: 85, views: 890 },
  { id: '3', image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=400&h=400&auto=format&fit=crop', category: 'Fine Line', likes: 210, views: 2400 },
  { id: '4', image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=400&h=400&auto=format&fit=crop', category: 'Realismo', likes: 156, views: 1600 },
];

export function ManagePortfolioScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      {/* HEADER */}
      <View className="px-8 flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white p-3 rounded-full shadow-sm">
          <ChevronLeft size={24} color="#000" strokeWidth={3} />
        </TouchableOpacity>
        <Text className="text-black font-black text-xl uppercase tracking-tighter">Portfólio</Text>
        <TouchableOpacity className="bg-black p-3 rounded-full shadow-lg">
          <Plus size={24} color="#fff" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* STATS MINI BANNER */}
        <View className="px-8 mb-10">
          <View className="bg-[#eaddd7] p-8 rounded-[48px] flex-row items-center justify-between shadow-sm">
            <View>
              <Text className="text-black font-black text-3xl tracking-tighter">6.2k</Text>
              <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Total de Views</Text>
            </View>
            <View className="w-[1px] h-10 bg-black/10" />
            <View>
              <Text className="text-black font-black text-3xl tracking-tighter">579</Text>
              <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Curtidas</Text>
            </View>
            <TouchableOpacity className="bg-black p-4 rounded-3xl">
              <Filter size={20} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* GALLERY GRID */}
        <View className="px-8">
          <Text className="text-black font-black text-xs uppercase tracking-[3px] mb-6 px-1 opacity-30">Seus Trabalhos</Text>
          
          <View className="flex-row flex-wrap justify-between">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <Animated.View 
                key={item.id}
                entering={FadeInDown.delay(index * 100).duration(600).springify()}
                className="mb-8"
              >
                <View className="relative">
                  <Image 
                    source={{ uri: item.image }}
                    style={{ width: width / 2 - 40, height: width / 2 - 10 }}
                    className="rounded-[40px] border-2 border-white shadow-sm"
                  />
                  <View className="absolute top-4 right-4 flex-row">
                    <TouchableOpacity className="bg-black/80 p-2.5 rounded-full backdrop-blur-md">
                      <Trash2 size={16} color="#ff3b30" strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                  <View className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-[24px] flex-row justify-around border border-black/5">
                    <View className="flex-row items-center">
                      <Heart size={12} color="#000" fill="#000" />
                      <Text className="text-black font-black text-[10px] ml-1">{item.likes}</Text>
                    </View>
                    <View className="w-[1px] h-3 bg-black/10" />
                    <View className="flex-row items-center">
                      <Eye size={12} color="#000" strokeWidth={2.5} />
                      <Text className="text-black font-black text-[10px] ml-1">{item.views}</Text>
                    </View>
                  </View>
                </View>
                <View className="mt-3 px-2 flex-row justify-between items-center">
                  <Text className="text-black font-black text-[10px] uppercase tracking-widest">{item.category}</Text>
                  <TouchableOpacity>
                    <Text className="text-black/40 font-bold text-[10px] uppercase">Editar</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* UPLOAD BOX */}
        <View className="px-8 mt-4">
          <TouchableOpacity 
            className="border-2 border-dashed border-black/10 bg-white/50 p-12 rounded-[48px] items-center justify-center"
          >
            <View className="bg-[#eaddd7] p-5 rounded-full mb-4">
              <Plus size={32} color="#000" strokeWidth={3} />
            </View>
            <Text className="text-black font-black text-sm uppercase tracking-widest text-center">
              Adicionar Nova Arte
            </Text>
            <Text className="text-black/40 text-[10px] font-bold mt-2 uppercase">PNG, JPG ou WEBP até 10MB</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
