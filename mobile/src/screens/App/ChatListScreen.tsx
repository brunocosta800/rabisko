import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MessageSquare, Sparkles, Plus } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MESSAGES = [
  {
    id: '1',
    name: 'João Santos',
    lastMessage: 'Combinado! Te vejo na terça-feira...',
    time: 'Ontem',
    avatar: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'João Santos',
    lastMessage: 'Combinado! Te vejo na terça-feira...',
    time: 'Ontem',
    avatar: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'João Santos',
    lastMessage: 'Combinado! Te vejo na terça-feira...',
    time: 'Ontem',
    avatar: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

export function ChatListScreen() {
  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      <ScrollView className="px-8" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="text-[48px] font-black text-black uppercase leading-[44px] tracking-tighter mb-4">
            Mensagens
          </Text>
          <Text className="text-black text-[15px] font-medium leading-tight">
            Gerencie sua conversa com tatuadores e sua IA
          </Text>
        </View>

        {/* AI SECTION */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600).springify()}
          className="bg-[#eaddd7] p-8 rounded-[40px] mb-8 flex-row items-center shadow-sm"
        >
          <View className="bg-black w-20 h-20 rounded-full items-center justify-center mr-5">
            <Sparkles size={32} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-black font-black text-xl uppercase tracking-tight">Bisko AI</Text>
            <Text className="text-black/60 text-xs font-medium mb-4">Ideias, referências, orçamentos e muito mais.</Text>
            <TouchableOpacity className="bg-black rounded-full py-2 px-6 self-start">
              <Text className="text-white font-bold text-xs uppercase">Iniciar Conversa</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* CHAT LIST */}
        <View className="space-y-4">
          {MESSAGES.map((chat, index) => (
            <Animated.View 
              key={chat.id + index}
              entering={FadeInDown.delay(200 + (index * 100)).duration(600).springify()}
            >
              <TouchableOpacity 
                className="bg-[#eaddd7] p-5 rounded-[32px] flex-row items-center mb-4 shadow-sm"
                activeOpacity={0.8}
              >
                <Image source={{ uri: chat.avatar }} className="w-16 h-16 rounded-full border-2 border-white/20" />
                <View className="ml-4 flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-black font-black text-lg uppercase tracking-tight">{chat.name}</Text>
                    <Text className="text-black/40 text-[10px] font-bold uppercase">{chat.time}</Text>
                  </View>
                  <Text className="text-black/60 text-xs font-medium" numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View className="items-center mt-10 mb-20">
          <TouchableOpacity className="bg-[#eaddd7] w-16 h-16 rounded-full items-center justify-center shadow-lg mb-4">
            <Plus size={32} color="#000" strokeWidth={3} />
          </TouchableOpacity>
          <Text className="text-black/40 text-[10px] font-bold uppercase text-center px-10">
            Inicie novas conversas visitando perfil de artistas e clicando em "Enviar Mensagem"
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
