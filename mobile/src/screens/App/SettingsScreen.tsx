import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import Animated, { FadeInDown } from 'react-native-reanimated';

export function SettingsScreen() {
  const { logout } = useAuthStore();
  
  // Ícones com proteção
  const { 
    User, Shield, Bell, Package, FileText, 
    CreditCard, HelpCircle, LogOut, ChevronRight, Camera
  } = Icons;

  const SETTINGS_GROUPS = [
    {
      title: 'Minha Conta',
      items: [
        { icon: User, title: 'Dados Pessoais', desc: 'Edite seu nome e contato' },
        { icon: Shield, title: 'Segurança', desc: 'Senha e privacidade' },
        { icon: Bell, title: 'Notificações', desc: 'Alertas e preferências' },
      ]
    },
    {
      title: 'Atividade',
      items: [
        { icon: Package, title: 'Meus Pedidos', desc: 'Acompanhe suas reservas' },
        { icon: FileText, title: 'Histórico', desc: 'Transações e recibos' },
        { icon: CreditCard, title: 'Pagamento', desc: 'Cartões salvos' },
      ]
    },
    {
      title: 'Outros',
      items: [
        { icon: HelpCircle, title: 'Suporte', desc: 'Central de ajuda' },
        { icon: LogOut, title: 'Sair da Conta', desc: 'Encerrar sessão', color: '#ff3b30' },
      ]
    }
  ];

  return (
    <View className="flex-1 bg-[#f8f9fa] pt-16">
      {/* HEADER */}
      <View className="px-8 flex-row items-center justify-between mb-8">
        <Text className="text-black font-black text-2xl uppercase tracking-tighter">Configurações</Text>
        <TouchableOpacity className="bg-[#eaddd7] p-3 rounded-full">
           {Bell && <Bell size={20} color="#000" strokeWidth={2.5} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* USER PROFILE CARD */}
        <Animated.View entering={FadeInDown.duration(800)} className="px-8 mb-10">
          <View className="bg-black p-8 rounded-[48px] shadow-2xl flex-row items-center">
            <View className="relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop' }}
                className="w-20 h-20 rounded-full border-2 border-[#eaddd7]"
              />
              <View className="absolute bottom-0 right-0 bg-[#eaddd7] p-1.5 rounded-full border-2 border-black">
                {Camera && <Camera size={12} color="#000" strokeWidth={3} />}
              </View>
            </View>
            <View className="ml-5 flex-1">
              <Text className="text-white font-black text-2xl tracking-tighter uppercase">Alexsander</Text>
              <Text className="text-white/40 text-xs font-bold">alexsander@email.com</Text>
              <View className="bg-[#eaddd7]/20 self-start px-3 py-1 rounded-full mt-2">
                <Text className="text-[#eaddd7] text-[8px] font-black uppercase tracking-widest">Membro desde 2024</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* GROUPS */}
        <View className="px-8">
          {SETTINGS_GROUPS.map((group, gIndex) => (
            <View key={group.title} className="mb-10">
              <Text className="text-black/30 font-black text-[10px] uppercase tracking-[3px] mb-6 ml-2">
                {group.title}
              </Text>
              
              <View>
                {group.items.map((item, iIndex) => (
                  <Animated.View 
                    key={item.title}
                    entering={FadeInDown.delay(200 + (gIndex * 100) + (iIndex * 50)).duration(600)}
                  >
                    <TouchableOpacity 
                      className="bg-white p-6 rounded-[32px] flex-row items-center border border-black/5 mb-4 shadow-sm"
                      onPress={() => item.title === 'Sair da Conta' ? logout() : null}
                    >
                      <View className="bg-[#eaddd7] p-4 rounded-2xl mr-5">
                        {item.icon && <item.icon size={20} color={item.color || "#000"} strokeWidth={2.5} />}
                      </View>
                      <View className="flex-1">
                        <Text className={`font-black text-lg uppercase tracking-tight ${item.color ? 'text-[#ff3b30]' : 'text-black'}`}>
                          {item.title}
                        </Text>
                        <Text className="text-black/30 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                          {item.desc}
                        </Text>
                      </View>
                      {ChevronRight && <ChevronRight size={18} color="#000" strokeWidth={3} className="opacity-10" />}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* VERSION TAG */}
        <View className="items-center mt-4">
          <Text className="text-black/10 font-black text-[10px] uppercase tracking-[4px]">Rabisko v1.0.4 - 2024</Text>
        </View>

      </ScrollView>
    </View>
  );
}
