import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, CreditCard, QrCode, Smartphone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';

const PAYMENT_METHODS = [
  { id: 'pix', name: 'Pix', icon: QrCode },
  { id: 'card', name: 'Cartão de Crédito', icon: CreditCard },
  { id: 'apple', name: 'Apple Pay', icon: Smartphone },
];

export function PaymentScreen() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = React.useState('pix');

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft size={24} stroke="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black uppercase tracking-tighter">Pagamento</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="bg-black p-8 rounded-[40px] mt-6 mb-10">
          <Text className="text-white/60 text-sm mb-1">Total a pagar</Text>
          <Text className="text-white text-4xl font-bold">R$ 250,00</Text>
          
          <View className="h-[1px] bg-white/20 my-6" />
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60">Serviço</Text>
            <Text className="text-white font-medium">Tatuagem Realista</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white/60">Profissional</Text>
            <Text className="text-white font-medium">João Santos</Text>
          </View>
        </View>

        <Text className="text-black font-bold text-xl mb-4">Escolha o Método</Text>
        <View className="space-y-4">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                className={`flex-row items-center p-6 rounded-3xl mb-4 border-2 ${
                  selectedMethod === method.id ? 'border-black bg-primary-100/30' : 'border-primary-100 bg-white'
                }`}
              >
                <View className="bg-black p-3 rounded-2xl mr-4">
                  <Icon size={24} stroke="#fff" />
                </View>
                <Text className="flex-1 text-black font-bold text-lg">{method.name}</Text>
                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  selectedMethod === method.id ? 'border-black bg-black' : 'border-primary-100'
                }`}>
                  {selectedMethod === method.id && <View className="w-2 h-2 bg-white rounded-full" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="p-6 pb-10 bg-white border-t border-gray-100">
        <Button 
          title={`Pagar com ${PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}`}
          onPress={() => {
            alert('Pagamento processado com sucesso!');
            navigation.navigate('HomeList' as never);
          }}
        />
      </View>
    </View>
  );
}
