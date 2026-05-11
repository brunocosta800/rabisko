import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export function StudioSettingsScreen() {
  const navigation = useNavigation();

  // Usando nomes garantidos do Lucide
  const { ChevronLeft, Camera, MapPin, Instagram, Globe, MessageSquare, Save } = Icons;

  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      {/* HEADER */}
      <View className="px-8 flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white p-3 rounded-full shadow-sm">
          {ChevronLeft && <ChevronLeft size={24} color="#000" strokeWidth={3} />}
        </TouchableOpacity>
        <Text className="text-black font-black text-xl uppercase tracking-tighter">Dados do Estúdio</Text>
        <View className="w-12" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* COVER & PROFILE IMAGE */}
        <View className="px-8 mb-12">
          <View className="relative bg-gray-200 h-44 rounded-[40px] overflow-hidden">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800&auto=format&fit=crop' }}
              className="w-full h-full"
            />
            <TouchableOpacity className="absolute bottom-4 right-4 bg-black/80 p-3 rounded-full">
              {Camera && <Camera size={20} color="#fff" />}
            </TouchableOpacity>
            
            <View className="absolute -bottom-10 left-10 p-1 bg-white rounded-full shadow-xl">
              <View className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop' }}
                  className="w-full h-full"
                />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-black p-2 rounded-full border-2 border-white">
                {Camera && <Camera size={14} color="#fff" />}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* FIELDS */}
        <View className="px-8 mt-10">
          <View className="bg-white p-8 rounded-[40px] shadow-sm border border-black/5 mb-6">
            <Text className="text-black font-black text-xs uppercase mb-4 opacity-30">Identidade</Text>
            <TextInput 
              placeholder="Nome do Estúdio"
              className="bg-[#f8f9fa] p-5 rounded-[24px] font-bold text-black border border-black/5 mb-4"
              defaultValue="João Santos Studio"
            />
            <TextInput 
              placeholder="Biografia"
              multiline
              className="bg-[#f8f9fa] p-5 rounded-[24px] font-bold text-black border border-black/5 min-h-[100px]"
              defaultValue="Especialista em realismo..."
            />
          </View>

          <View className="bg-white p-8 rounded-[40px] shadow-sm border border-black/5 mb-6">
            <View className="flex-row items-center mb-4">
              {MapPin && <MapPin size={18} color="#000" />}
              <Text className="text-black font-black text-xs uppercase ml-2 opacity-30">Localização</Text>
            </View>
            <TextInput 
              className="bg-[#f8f9fa] p-5 rounded-[24px] font-bold text-black border border-black/5"
              defaultValue="Rua Augusta, 1000 - SP"
            />
          </View>

          <View className="bg-white p-8 rounded-[40px] shadow-sm border border-black/5">
             <Text className="text-black font-black text-xs uppercase mb-4 opacity-30">Redes Sociais</Text>
             <View className="flex-row items-center mb-4 bg-[#f8f9fa] p-2 rounded-[20px]">
                <View className="bg-[#eaddd7] p-3 rounded-xl mr-3">
                  {Instagram && <Instagram size={18} color="#000" />}
                </View>
                <TextInput className="flex-1 font-bold text-black" defaultValue="@joaosantos" />
             </View>
             <View className="flex-row items-center bg-[#f8f9fa] p-2 rounded-[20px]">
                <View className="bg-[#eaddd7] p-3 rounded-xl mr-3">
                  {MessageSquare && <MessageSquare size={18} color="#000" />}
                </View>
                <TextInput className="flex-1 font-bold text-black" defaultValue="11 98765-4321" />
             </View>
          </View>
        </View>
      </ScrollView>

      {/* SAVE BUTTON */}
      <View className="absolute bottom-10 left-8 right-8">
        <TouchableOpacity 
          className="bg-black h-20 rounded-full items-center justify-center shadow-2xl flex-row"
          onPress={() => navigation.goBack()}
        >
          {Save && <Save size={24} color="#fff" className="mr-3" />}
          <Text className="text-white font-black text-xl uppercase tracking-widest">Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
