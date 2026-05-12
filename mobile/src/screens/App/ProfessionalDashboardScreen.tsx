import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Calendar, TrendingUp, Users, Image as ImageIcon, Clock, CheckCircle, ChevronRight, Activity, Bell, Settings } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export function ProfessionalDashboardScreen() {
  const navigation = useNavigation<any>();
  const [isOnline, setIsOnline] = React.useState(true);

  const ACTIONS = [
    { icon: ImageIcon, title: 'Atualizar Portfólio', desc: '12 novos trabalhos enviados', route: 'ManagePortfolio' },
    { icon: Calendar, title: 'Gerenciar Horários', desc: 'Aberto para Junho/Julho', route: 'ManageAvailability' },
    { icon: CheckCircle, title: 'Serviços & Preços', desc: 'Edite sua tabela de valores', route: 'ManageServices' },
    { icon: Settings, title: 'Dados do Estúdio', desc: 'Bio, endereço e redes sociais', route: 'StudioSettings' },
  ];

  return (
    <View className={`flex-1 pt-16 ${isOnline ? 'bg-[#f8f9fa]' : 'bg-[#f1f1f1]'}`}>
      <ScrollView className="px-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* TOP STATUS BAR */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center bg-white px-5 py-3 rounded-full shadow-sm border border-black/5">
            <View className={`w-2.5 h-2.5 rounded-full mr-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            <Text className="text-black font-black text-[10px] uppercase tracking-widest">
              {isOnline ? 'Recebendo Pedidos' : 'Agenda Fechada'}
            </Text>
            <Switch 
              value={isOnline} 
              onValueChange={setIsOnline} 
              trackColor={{ false: '#767577', true: '#000' }}
              thumbColor={isOnline ? '#eaddd7' : '#f4f3f4'}
              className="ml-4 scale-75"
            />
          </View>
          <TouchableOpacity className="bg-[#eaddd7] p-4 rounded-full">
            <Bell size={20} color="#000" strokeWidth={2.5} />
            <View className="absolute top-0 right-0 w-4 h-4 bg-black rounded-full items-center justify-center border-2 border-white">
              <Text className="text-white text-[8px] font-bold">3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-10">
          <View className="flex-1">
            <Text className="text-[44px] font-black text-black uppercase leading-[40px] tracking-tighter">
              Olá, João
            </Text>
            <Text className="text-black/40 text-sm font-bold mt-1 uppercase tracking-widest">Studio Jardins • Level 4</Text>
          </View>
          <View className="bg-black p-1 rounded-full border-2 border-[#eaddd7] shadow-xl">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=200&h=200&auto=format&fit=crop' }} 
              className="w-20 h-20 rounded-full"
            />
          </View>
        </View>

        {/* NEXT SESSION FOCUS */}
        <Animated.View 
          entering={FadeInDown.duration(800).springify()}
          className="bg-black p-8 rounded-[48px] mb-8 shadow-2xl overflow-hidden"
        >
          <View className="flex-row justify-between items-start mb-6">
            <View className="bg-[#eaddd7] px-4 py-2 rounded-full">
              <Text className="text-black font-black text-[10px] uppercase">Próxima Sessão</Text>
            </View>
            <Text className="text-[#eaddd7] font-black text-2xl tracking-tighter">Em 45 min</Text>
          </View>
          <View className="flex-row items-center">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=100&h=100&auto=format&fit=crop' }} 
              className="w-14 h-14 rounded-2xl mr-4 border-2 border-white/20"
            />
            <View>
              <Text className="text-white font-black text-xl tracking-tight">Mariana Silva</Text>
              <Text className="text-white/40 text-xs font-bold uppercase tracking-widest">Tattoo Realismo (P)</Text>
            </View>
            <TouchableOpacity className="bg-white w-12 h-12 rounded-full ml-auto items-center justify-center">
              <ChevronRight size={24} color="#000" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* PERFORMANCE STATS */}
        <View className="flex-row justify-between mb-10">
          <Animated.View 
            entering={FadeInDown.delay(100).duration(600).springify()}
            className="bg-[#eaddd7] p-7 rounded-[40px] flex-1 mr-4 shadow-sm"
          >
            <TrendingUp size={28} color="#000" strokeWidth={2.5} />
            <Text className="text-black font-black text-2xl mt-4 tracking-tighter">R$ 12.4k</Text>
            <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Ganhos (Mês)</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(200).duration(600).springify()}
            className="bg-white p-7 rounded-[40px] flex-1 shadow-sm border border-black/5"
          >
            <Activity size={28} color="#000" strokeWidth={2.5} />
            <Text className="text-black font-black text-2xl mt-4 tracking-tighter">94%</Text>
            <Text className="text-black/40 text-[10px] font-black uppercase tracking-widest mt-1">Saturação</Text>
          </Animated.View>
        </View>

        {/* QUICK ACTIONS */}
        <View className="mb-10">
          <Text className="text-black font-black text-xs uppercase tracking-[3px] mb-6 px-1 opacity-30">Ferramentas de Gestão</Text>
          
          {ACTIONS.map((action, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(500 + (index * 100)).duration(600).springify()}
            >
              <TouchableOpacity 
                className="bg-white border border-black/5 p-7 rounded-[40px] flex-row items-center mb-4 shadow-sm"
                onPress={() => action.route && navigation.navigate(action.route)}
              >
                <View className="bg-[#eaddd7] p-4 rounded-3xl mr-5">
                  <action.icon size={26} color="#000" strokeWidth={2.5} />
                </View>
                <View className="flex-1">
                  <Text className="text-black font-black text-lg uppercase tracking-tight">{action.title}</Text>
                  <Text className="text-black/40 text-xs font-medium mt-1">{action.desc}</Text>
                </View>
                <ChevronRight size={20} color="#000" strokeWidth={3} className="opacity-20" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
