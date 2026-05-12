import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Star, MapPin, Clock, MessageSquare, ChevronLeft, Share2, Instagram, Heart } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PORTFOLIO = [
  'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=400&h=400&auto=format&fit=crop',
];

export function EstablishmentProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  
  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* HERO IMAGE SECTION */}
        <View className="relative h-[480px]">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800&auto=format&fit=crop' }}
            className="w-full h-full"
          />
          <View className="absolute inset-0 bg-black/50" />
          
          {/* HEADER BUTTONS */}
          <View className="absolute top-16 left-8 right-8 flex-row justify-between">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/10">
              <ChevronLeft size={24} color="#fff" strokeWidth={3} />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/10 mr-3">
                <Share2 size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/10">
                <Heart size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ARTIST INFO OVERLAY */}
          <View className="absolute bottom-12 left-8 right-8">
            <Animated.View entering={FadeInUp.duration(800)}>
              <View className="flex-row items-center mb-4">
                <View className="bg-black px-4 py-1.5 rounded-full mr-3 border border-white/20">
                  <Text className="text-white font-black text-[10px] uppercase tracking-widest">Artista Premium</Text>
                </View>
                <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <Star size={12} color="#eaddd7" fill="#eaddd7" />
                  <Text className="text-white font-black text-[10px] ml-1">4.9 (128 Reviews)</Text>
                </View>
              </View>
              <Text className="text-white text-6xl font-black uppercase tracking-tighter leading-[54px]">
                João Santos
              </Text>
              <Text className="text-white/60 text-lg font-medium mt-3 tracking-tight">Especialista em Realismo & Blackwork</Text>
            </Animated.View>
          </View>
        </View>

        {/* CONTENT SECTION */}
        <View className="px-8 -mt-10 bg-[#f8f9fa] rounded-t-[60px] pt-14">
          {/* ACTION BUTTONS GRID */}
          <View className="flex-row flex-wrap justify-between mb-12">
            {[
              { icon: MessageSquare, label: 'Chat', route: 'Chat' },
              { icon: Instagram, label: 'Portfólio', route: null },
              { icon: MapPin, label: 'Local', route: null },
            ].map((action, i) => (
              <TouchableOpacity 
                key={i}
                onPress={() => action.route && navigation.navigate(action.route)}
                className="bg-[#eaddd7] p-7 rounded-[36px] w-[30%] items-center justify-center shadow-sm"
              >
                <action.icon size={26} color="#000" strokeWidth={2.5} />
                <Text className="text-black font-black text-[10px] uppercase mt-3 tracking-widest">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* BIO CARD */}
          <View className="mb-12 bg-white p-8 rounded-[40px] shadow-sm border border-black/5">
            <Text className="text-black font-black text-xs uppercase tracking-[3px] mb-4 opacity-30">A Jornada</Text>
            <Text className="text-black/80 text-[17px] leading-7 font-medium">
              Com mais de uma década de maestria, João Santos transcende a tatuagem convencional. Sua técnica de realismo é reconhecida por capturar a alma através da agulha, transformando peles em telas de museu.
            </Text>
          </View>

          {/* PORTFOLIO GRID */}
          <View className="mb-12">
            <View className="flex-row justify-between items-end mb-8 px-1">
              <Text className="text-black font-black text-2xl uppercase tracking-tighter">Obras Primas</Text>
              <TouchableOpacity><Text className="text-black/40 font-bold text-xs uppercase tracking-widest">Ver Tudo</Text></TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-between">
              {PORTFOLIO.map((img, index) => (
                <Animated.View 
                  key={index} 
                  entering={FadeInDown.delay(index * 100).duration(600).springify()}
                  className="mb-6"
                >
                  <Image 
                    source={{ uri: img }} 
                    style={{ width: width / 2 - 40, height: width / 2 - 10 }}
                    className="rounded-[40px] border-2 border-white"
                  />
                </Animated.View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING BOOKING BUTTON BAR */}
      <View className="absolute bottom-24 left-8 right-8">
        <TouchableOpacity 
          onPress={() => navigation.navigate('Booking')}
          className="bg-black h-20 rounded-full items-center justify-center shadow-2xl flex-row overflow-hidden"
        >
          <View className="bg-white/10 h-full px-6 items-center justify-center border-r border-white/5">
             <Clock size={24} color="#eaddd7" strokeWidth={3} />
          </View>
          <Text className="text-white font-black text-xl uppercase tracking-widest ml-auto mr-auto">Agendar Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
